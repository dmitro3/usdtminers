import {
  Avatar,
  AvatarBadge,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addressEqual, useEthers } from "@usedapp/core";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { AddressZero } from "../../constants";
import { Storage, useFirebase } from "../../firebase";

export const ProfileAvatarComponent = ({ size, action, address }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, updatePhotoUrl, updateUserData, getUserData } =
    useFirebase();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData(undefined, address ?? AddressZero).then((data) => {
      setUserData(data);
    });
  }, [address, userData?.photoURL]);

  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 1,
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const storageRef = ref(Storage, `ProfilePictures/${address ?? AddressZero}`);

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  const ClearVar = () => {
    onClose();
    setSrc(null);
    setCrop(null);
    setImage(null);
    setOutput(null);
  };

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
  };

  const HandleUploadProfileImage = async () => {
    try {
      setIsLoading(true);
      await uploadString(storageRef, output, "data_url");
      const url = await getDownloadURL(storageRef);
      await updatePhotoUrl(url);
      await updateUserData(address, {
        photoURL: url,
      });
      setUserData({
        ...userData,
        photoURL: url,
      });
      setIsLoading(false);
      ClearVar();
      toast({
        title: "Profile Picture Uploaded.",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Avatar
        cursor="pointer"
        size={size ? size : "xl"}
        bgColor={colorMode === "light" ? "blue.200" : "transparent"}
        boxShadow="md"
        onClick={() => action ?? onOpen()}
        src={userData?.photoURL}
      >
        <AvatarBadge boxSize="1em" bg="green" />
      </Avatar>

      <Modal isOpen={isOpen} onClose={ClearVar} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius="40px"
          borderWidth={10}
          borderColor="#ff0080"
        >
          <ModalHeader>Upload a profile pic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              {isLoading ? (
                <Spinner />
              ) : !output ? (
                <>
                  <ReactCrop
                    src={src}
                    onImageLoaded={(c) => setImage(c)}
                    crop={crop}
                    onChange={setCrop}
                  ></ReactCrop>
                </>
              ) : (
                <Image src={output} />
              )}
            </VStack>
            <FileUploader
              handleChange={(e) => {
                selectImage(e);
              }}
              types={["JPG", "PNG", "GIF"]}
              onTypeError={() => {
                toast({
                  title: "File type not supported",
                  description: "Please upload 'JPG', 'PNG', 'GIF' files only.",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom",
                });
              }}
              multiple={false}
              label="Upload Profile Pic"
              maxSize={5}
              onSizeError={() => {
                toast({
                  title: "Max 1MB file supported",
                  description: "Please upload below 1 MB File",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom",
                });
              }}
            />
          </ModalBody>

          <ModalFooter>
            {output ? (
              <>
                <Button onClick={HandleUploadProfileImage} colorScheme="blue">
                  Set Profile Pic
                </Button>
                <Button
                  mr={3}
                  variant="ghost"
                  onClick={!output ? cropImageNow : () => setOutput(null)}
                >
                  {!output ? "Crop Image" : "Crop Again"}
                </Button>
              </>
            ) : (
              <Button
                mr={3}
                variant="ghost"
                onClick={!output ? cropImageNow : () => setOutput(null)}
              >
                {!output ? "Crop Image" : "Crop Again"}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

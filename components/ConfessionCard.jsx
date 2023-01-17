import { useState } from "react";
import { Image } from "@chakra-ui/image";
import {
  chakra,
  Flex,
  useColorModeValue,
  Badge,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import { SiBuymeacoffee } from "react-icons/si";

import { useAccount, useEnsName } from "wagmi";
import BuyCoffeeModal from "./BuyCoffeeModal";

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

const ConfessionCard = ({
  confession: { hash, message, author, holder, category, timestamp },
  index,
}) => {
  const { address, isConnected } = useAccount();

  const [showBuyCoffeeModal, setShowBuyCoffeeModal] = useState(false);

  const formatDate = (blockTimestamp) => {
    const date = new Date(blockTimestamp * 1000);
    return formatRelative(date, new Date());
  };

  const { data, isError, isLoading } = useEnsName({
    address: "0x995a99b34714067B0281747286681C9F0170AbE1",
    chainId: 5,
  });

  return (
    <>
      <Flex
        boxShadow={"lg"}
        maxW={"2xl"}
        direction={{ base: "column-reverse", md: "row" }}
        width={"full"}
        rounded={"xl"}
        p={[6, 10]}
        justifyContent={"space-between"}
        position={"relative"}
        bg={useColorModeValue("white", "gray.800")}
        _before={{
          content: '""',
          position: "absolute",
          zIndex: "-1",
          height: "full",
          maxW: "640px",
          width: "full",
          filter: "blur(20px)",
          transform: "scale(1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: 0,
          left: 0,
          backgroundImage: backgrounds[index % 10],
        }}
      >
        <Flex
          direction={"column"}
          textAlign={"left"}
          justifyContent={"space-between"}
        >
          <chakra.div pb="4">
            <Image
              src={`https://${hash}.ipfs.w3s.link`}
              alt="Confession"
              width="404"
              height="265"
            />
          </chakra.div>
          <chakra.p fontWeight={"medium"} fontSize={"18px"} pb={4}>
            {message.charAt(0).toUpperCase() + message.slice(1)}
          </chakra.p>
          <chakra.p fontWeight={"medium"} fontSize={16}>
            Certificate Holder: {holder.substring(0, 6)}...{holder.substring(holder.length - 4)}
          </chakra.p>

          {author == "0x995a99b34714067B0281747286681C9F0170AbE1" ? (
            <chakra.p fontWeight={"bold"} fontSize={14}>
              {data}
              <chakra.span fontWeight={"medium"} color={"gray.500"}>
                {" "}
                - {formatDate(timestamp)}
              </chakra.span>
            </chakra.p>
          ) : (
            <chakra.p fontWeight={"bold"} fontSize={14}>
              {author.substring(0, 6)}...{author.substring(author.length - 4)}
              <chakra.span fontWeight={"medium"} color={"gray.500"}>
                {" "}
                - {formatDate(timestamp)}
              </chakra.span>
            </chakra.p>
          )}

          <Badge colorScheme="blue" mt={4} width="fit-content">
            {category}
          </Badge>
        </Flex>

        {isConnected && address.toLowerCase() !== holder.toLowerCase() && (
          <Tooltip label="Buy me a coffee" bg="blackAlpha.400" color="white">
            <span>
              <Icon
                as={SiBuymeacoffee}
                w={8}
                h={8}
                mt={4}
                cursor="pointer"
                position="absolute"
                bottom={5}
                right={5}
                _hover={{
                  color: "#6F4E37",
                  transform: "scale(1.1)",
                  transition: "all 0.2s ease-in-out",
                }}
                onClick={() => setShowBuyCoffeeModal(true)}
              />
            </span>
          </Tooltip>
        )}
      </Flex>

      <BuyCoffeeModal
        isOpen={showBuyCoffeeModal}
        onClose={() => setShowBuyCoffeeModal(false)}
        holder={holder}
      />
    </>
  );
};

export default ConfessionCard;

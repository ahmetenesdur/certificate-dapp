import { useQuery, gql } from "@apollo/client";
import { Grid, GridItem } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import ConfessionCard from "../../components/ConfessionCard";
import ConfessionCardSkeleton from "../../components/skeleton/ConfessionCardSkeleton";

const GET_CERTIFICATIONS = gql`
  query certifications(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $where: Certification_filter
  ) {
    certifications(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      hash
      message
      category
      author
      holder
      timestamp
    }
  }
`;

export default function MyConfession() {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_CERTIFICATIONS, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: "timestamp",
      orderDirection: "desc",
      where: { holder: address },
    },
  });

  if (error) return <p> Error please try again </p>;

  return (
    <div>
      <main>
        <Grid
          mt="10"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={6}
          justifyContent={"center"}
        >
          {loading
            ? new Array(6).fill(0).map((_, index) => (
                <GridItem key={index}>
                  <ConfessionCardSkeleton />
                </GridItem>
              ))
            : data?.certifications?.map((confession, index) => (
                <GridItem colSpan={1} key={confession.id}>
                  <ConfessionCard confession={confession} index={index} />
                </GridItem>
              ))}
        </Grid>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { coins } from '../api';

const Container = styled.View``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Coin = styled.View`
  align-items: center;
  background-color: black;
`;
const CoinName = styled.Text`
  color: white;
`;
const CoinSymbol = styled.Text`
  color: white;
`;

const Home = () => {
  const { isLoading, data } = useQuery('coins', coins);
  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    if (data) {
      setCleanData(data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new));
    }
  }, [data]);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color='white' size='large' />
      </Loader>
    );
  }

  return (
    <Container>
      <FlatList
        data={cleanData}
        numColumns={5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Coin>
            <CoinName>{item.name}</CoinName>
            <CoinSymbol>{item.symbol}</CoinSymbol>
          </Coin>
        )}
      />
    </Container>
  );
};

export default Home;

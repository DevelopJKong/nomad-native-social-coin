import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';
import { history, info } from '../api';
import { BLACK_COLOR } from '../color';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;
const Text = styled.Text``;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: symbol,
    });
  }, []);

  const { loading: infoLoading, data: infoData } = useQuery(['coinInfo', id], info);
  const { isLoading: historyLoading, data: historyData } = useQuery(['coinHistory', id], history);
  const [victoryData, setVictoryData] = useState(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        }))
      );
    }
  }, [historyData]);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation="monotoneX"
            data={victoryData}
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: "#1abc9c" } }}
          />
        </VictoryChart>
      ) : null}
    </Container>
  );
};

export default Detail;

import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
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
    params: { symbol },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: symbol,
    });
  }, []);

  const { loading: infoLoading, data: infoData } = useQuery(['coinInfo', id], info);
  const { loading: historyLoading, data: historyData } = useQuery(['coinHistory', id], history);

  console.log(infoData);

  return (
    <Container>
      <Text>{symbol}</Text>
    </Container>
  );
};

export default Detail;

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

let sandboxUri = 'https://48p1r2roz4.sse.codesandbox.io';
let localUri = 'http://localhost:4000/graphql'
let remoteUri = 'https://80c5-14-2-61-115.ngrok.io/graphql'
const client = new ApolloClient({
  uri: remoteUri,
  cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const GET_TOKEN_NAME = gql`
  query GetTokenName($address: String!) {
    getTokenName(address: $address) 

    
  }
`;

const GET_TOTAL_SUPPLY = gql`
  query GetTotalSupply($address: String!) {
    getTotalSupply(address: $address) 

    
  }
`;

const GET_TXNS_HISTORY = gql`
  query GetTxnsHistory($address: String!, $block: Int!) {
    getTxnsList(address: $address, block: $block) {
      txnHash
      blockNumber
      topics
    }

    
  }
`;

const GET_PRICE_ETH = gql`
  query GetPriceETH($address: String!) {
    getPriceETH(address: $address)
      

    
  }
`;

const GET_PRICE_USD = gql`
  query GetPriceUSD($address: String!) {
    getPriceUSD(address: $address)
      

    
  }
`;

const GET_EARLIEST_POOL = gql`
  query GetEarliestPool($address: String!) {
    getEarliestUniswapPool(address: $address)
      

    
  }
`;


const TokenName = ({ address }) => {
  //let address = "0x514910771af9ca656af840dff83e8264ecf986ca";
  const { loading, error, data } = useQuery(GET_TOKEN_NAME, {
    variables: { address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>

      { JSON.stringify(data) }
    </div>
  )

}

const TotalSupply = ({ address }) => {
  const { loading, error, data } = useQuery(GET_TOTAL_SUPPLY, {
    variables: { address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
  
        { JSON.stringify(data) }
      </div>
    )
}

const EarliestPool = ({ address }) => {
  const { loading, error, data } = useQuery(GET_EARLIEST_POOL, {
    variables: { address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
  
        { JSON.stringify(data) }
      </div>
    )
}

const TxnsHistory = ({ address, block }) => {
  console.log(address, block);
  const { loading, error, data } = useQuery(GET_TXNS_HISTORY, {
    variables: { address, block },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
  
        { JSON.stringify(data) }
      </div>
    )
}

const PriceETH = ({ address }) => {
  
  const { loading, error, data } = useQuery(GET_PRICE_ETH, {
    variables: { address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
  
        { JSON.stringify(data) }
      </div>
    )
}

const PriceUSD = ({ address }) => {
  
  const { loading, error, data } = useQuery(GET_PRICE_USD, {
    variables: { address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
  
        { JSON.stringify(data) }
      </div>
    )
}


const ExchangeRates = () => {

  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    return (
      <div>

        { JSON.stringify(data) }
      </div>
    )
}


  


export default function App() {
  const[data, setData] = useState<any>('');

  const [address, setAddress] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Searching ${address}`)
  }

  // useEffect(() => {
  //   async function fetchAPI() {
  //     let response = await ExchangeRates();
  //     setData(response);
  //   }
  //   fetchAPI();
    
  // }, []);
  let block: number  = 20;
  return (
    <div className="App">
      <header className="App-header">
	      
        <div className="container">

          <div className="row">

            <div className="column">
              <form onSubmit={ handleSubmit }>
                <label>
                  Token address:
                    <input type="text" value={ address } name="address" onChange={e => setAddress(e.target.value)} />
                </label>
                <input type="submit" value="Search" />
              </form>

            </div>
          </div>
      </div>
      <div className="container">
          <div className="row">
            <div className="column">
              <div className="jumbotron bg-transparent">
                <TokenName address = { address }/>
              </div>
            </div>
            <div className="column">
              <div className="jumbotron bg-transparent">
                <TotalSupply address = { address } />
              </div>
            </div>
            <div className="column">
              <div className="jumbotron bg-transparent">
                <TxnsHistory address = { address } block = { block } />
              </div>
            </div>

            <div className="column">
              <div className="jumbotron bg-transparent">
                Price in USD
                <PriceUSD address = { address } />
              </div>
            </div>

            <div className="column">
              <div className="jumbotron bg-transparent">
                Price in ETH
                <PriceETH address = { address } />
              </div>
            </div>

            <div className="column">
              <div className="jumbotron bg-transparent">
                Earliest recorded pool
                <EarliestPool address = { address } />
              </div>
            </div>

          </div>
        
          

        </div>
        
        
        
        
     </header>
    </div>
  );
}





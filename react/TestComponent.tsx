import React from 'react';

import { useQuery } from 'react-apollo';
import useProduct from 'vtex.product-context/useProduct';
import productData from './graphql/productData.graphql';

const TestComponent: StorefrontFunctionComponent = () => {
  const { product } = useProduct();
  const { data, loading, error } = useQuery(productData, {
    variables: {
      slug: product?.linkText
    },
    ssr: false
  }
)

if (loading) {
  return (
    <div>
    <h4>Loading...</h4>
  </div>
  )
}

if (!product) {
  return (
    <div>
    <h3>No product context.</h3>
  </div>
  )
}

if (error) {
  return (
    <div>
    <pre>{error}</pre>
  </div>
  )
}
console.log('product: ', product);
console.log('data: ', data);
return (
  <div>
    <h1>{product?.productName}</h1>
  </div>
)
}

TestComponent.schema = {
  title: 'editor.test.title',
  description: 'editor.test.description',
  type: 'object',
  properties: {
    testProp: {
      title: 'Test prop title',
      description: 'Test prop description',
      type: 'string',
      default: null
    }
  },
}

export default TestComponent

import React from 'react';
import Image from '../components/Image';
import styled from 'styled-components/native';
import {Pressable} from 'react-native';

import {Text, StrikeThroughText} from '../components/Text';

import {Action} from '../types/action';
import {triggerWidgetAction} from '../lib/action-handler';

export const PRODUCT_TILE_ASPECT_RATIO = '3:4';
const LETTER_SPACING = 1;

const ProductMeta = styled.View`
  padding-top: 12px;
`;

const Brand = styled(Text)`
  font-size: ${({theme}) => theme.tokens.fonts.size.normal + 1}px;
  line-height: 16px;
  overflow: hidden;
  color: ${({theme}) => theme.tokens.colors.base.greyishBrown};
  letter-spacing: ${LETTER_SPACING}px;
  padding-bottom: 4px;
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.medium};

const ProductTitle = styled(Text)`
  font-size: ${({theme}) => theme.tokens.fonts.size.normal + 1}px;
  line-height: ${({theme}) => theme.tokens.fonts.size.default}px;
  overflow: hidden;
  letter-spacing: ${LETTER_SPACING}px;
  color: ${({theme}) => theme.grayColor};
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding-top: 4px;
`;

const ProductPrice = styled(Text)`
  font-size: ${({theme}) => theme.tokens.fonts.size.small}px;
  color: ${({theme}) => theme.tokens.colors.base.blackFourteen};
  line-height: ${({theme}) => theme.tokens.fonts.size.default}px;
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.bold};

const SecondaryPrice = styled(StrikeThroughText)`
  padding-left: 6px;
`;

interface ProductTileWidgetProps {
  title: string;
  price: string;
  id: number;
  secondaryPrice?: string;
  elementWidth?: number;
  imageURL: string;
  index?: number;
  action?: Action;
  brand?: string;
}

class ProductTileWidget extends React.Component<ProductTileWidgetProps> {
  triggerAction = () => {
    const {action} = this.props;

    if (action) {
      triggerWidgetAction(action);
    }
  };

  render() {
    const {
      imageURL,
      elementWidth,
      title,
      price,
      secondaryPrice,
      brand,
    } = this.props;

    return (
      <Pressable testID="product-tile" onPress={this.triggerAction}>
        <>
          <Image
            url={imageURL}
            width={elementWidth}
            ar={PRODUCT_TILE_ASPECT_RATIO}
            style={{
              borderRadius: 6,
              height: elementWidth ? Math.floor((elementWidth * 195) / 145) : 0,
            }}
            memoizeImage={true}
          />
          <ProductMeta>
            {brand && <Brand numberOfLines={1}>{brand}</Brand>}
            <ProductTitle numberOfLines={brand ? 1 : 2}>{title}</ProductTitle>
            <PriceContainer>
              <ProductPrice>{price}</ProductPrice>
              {secondaryPrice ? (
                <SecondaryPrice>{secondaryPrice}</SecondaryPrice>
              ) : null}
            </PriceContainer>
          </ProductMeta>
        </>
      </Pressable>
    );
  }
}

export default ProductTileWidget;

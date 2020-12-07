export default {
  id: 'sunset',
  viewScheme: 'CANVAS',
  blocks: [
    {
      type: 'CAROUSEL',
      blocks: [
        {
          type: 'IMAGE',
          imageURL: 'https://picsum.photos/600/300',
          borderRadius: 8,
          ar: '600:300',
          blocks: [],
        },
        {
          type: 'IMAGE',
          imageURL: 'https://picsum.photos/600/300',
          borderRadius: 8,
          ar: '600:300',
          blocks: [],
        },
      ],
      layoutProps: {
        margin: {
          bottom: 20,
        },
      },
    },

    {
      type: 'IMAGE',
      imageURL: 'https://picsum.photos/680/630',
      fullScreen: false,
      borderRadius: 8,
      ar: '680:630',
      blocks: [],
      layoutProps: {
        margin: {
          bottom: 20,
        },
      },
    },
    {
      type: 'TYPOGRAPHY',
      text: 'I can render text with red color',
      fontSize: 20,
      color: 'red',
      blocks: [],
      layoutProps: {
        margin: {
          bottom: 20,
          left: 20,
          right: 20,
        },
      },
    },

    {
      type: 'BUTTON',
      text: 'I am primary button',
      appearance: 'primary',
      blocks: [],
      layoutProps: {
        margin: {
          bottom: 20,
          left: 20,
          right: 20,
        },
      },
    },

    {
      type: 'LIST',
      tileSpacing: 20,
      tilesPerRow: 3,
      useRecyclerView: true,
      header: {
        title: 'NIKE',
        action: {
          url: 'www.nike.com',
        },
      },
      blocks: [
        {
          type: 'PRODUCT_TILE',
          imageURL: 'https://picsum.photos/100/150',
          title: 'Product 3',
          price: '$ 200',
          secondaryPrice: '$ 250',
          brand: 'NIKE',
          blocks: [],
        },
        {
          type: 'PRODUCT_TILE',
          imageURL: 'https://picsum.photos/100/150',
          title: 'Product 1',
          price: '$ 200',
          brand: 'NIKE',
          blocks: [],
        },
        {
          type: 'PRODUCT_TILE',
          imageURL: 'https://picsum.photos/100/150',
          title: 'Product 2',
          price: '$ 200',
          secondaryPrice: '$ 250',
          brand: 'NIKE',
          blocks: [],
        },
      ],
    },

    {
      type: 'GRID',
      useRecyclerView: false,
      tileSpacing: 20,
      title: 'Some grids here',
      data: [
        {
          type: 'IMAGE',
          imageURL: 'https://picsum.photos/200/200',
          borderRadius: 8,
          ar: '200:200',
          blocks: [],
        },
        {
          type: 'IMAGE',
          imageURL: 'https://picsum.photos/200/200',
          borderRadius: 8,
          ar: '200:200',
          blocks: [],
        },
        {
          type: 'IMAGE',
          imageURL: 'https://picsum.photos/200/200',
          borderRadius: 8,
          ar: '200:200',
          blocks: [],
        },
        {
          type: 'IMAGE',
          imageURL: 'https://picsum.photos/200/200',
          borderRadius: 8,
          ar: '200:200',
          blocks: [],
        },
      ],
      layoutProps: {
        margin: {
          bottom: 20,
        },
      },
    },
  ],
};

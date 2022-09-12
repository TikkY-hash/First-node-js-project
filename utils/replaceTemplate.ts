export interface CardType {
  id?: number;
  productName?: string;
  image?: string;
  from?: string;
  nutrients?: string;
  quantity?: string;
  price?: string;
  organic?: boolean;
  description?: string;
}

export interface ReplaceTemplateType {
  template: string;
  data: CardType;
}

export const replaceTemplate = ({ data, template }: ReplaceTemplateType) => {
  let newCard = template.replaceAll("{%IMAGE%}", data.image);
  newCard = newCard.replaceAll("{%PRODUCTNAME%}", data.productName);
  newCard = newCard.replaceAll("{%QUANTITY%}", data.quantity);
  newCard = newCard.replaceAll("{%PRICE%}", data.price);
  newCard = newCard.replaceAll("{%ID%}", `${data.id}`);
  newCard = newCard.replaceAll("{%FROM%}", data.from);
  newCard = newCard.replaceAll("{%NUTRIENTS%}", data.nutrients);
  newCard = newCard.replaceAll("{%DESCRIPTION%}", data.description);

  if (!data.organic) newCard = newCard.replaceAll("{%ORGANIC%}", "not-organic");

  return newCard;
};



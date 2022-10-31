export interface CardData {
  id: string;
  title: string;
  ingredients: string;
  price: string;
  weight: string;
  ccal: string;
}

export interface FormData {
  name: string;
  date: string;
  delivery: string;
  time: string;
  image: string | null;
  agree: boolean;
}

export interface GuardianResponseItem {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    headline: string;
    standfirst: string;
    trailText: string;
    byline: string;
    main: string;
    body: string;
    wordcount: string;
    firstPublicationDate: string;
    isInappropriateForSponsorship: string;
    isPremoderated: string;
    lastModified: string;
    productionOffice: string;
    publication: string;
    shortUrl: string;
    shouldHideAdverts: string;
    showInRelatedContent: string;
    thumbnail?: string;
    legallySensitive: string;
    lang: string;
    isLive: string;
    bodyText: string;
    charCount: string;
    shouldHideReaderRevenue: string;
    showAffiliateLinks: string;
    bylineHtml: string;
  };
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianResponseItem[];
  };
}

export interface ModalData {
  body: string;
  thumbnail?: string;
  standfirst: string;
  webPublicationDate: string;
  shortUrl: string;
}

export interface FormDataValues {
  name: string;
  date: string;
  delivery: string;
  time: string;
  image: string | null;
  agree: string;
  formStatesArr: FormData[] | [];
}

export interface InitialState {
  search: {
    query: string;
    dataArr: GuardianResponseItem[] | [];
    sort: string;
    totalPages: number | null;
    currentPage: number;
    itemsPerPage: number;
  };
  form: {
    name: string;
    date: string;
    delivery: string;
    time: string;
    image: string;
    agree: string;
  };
}

export enum ErrorMessages {
  NAME_REQUIRED = 'This field cannot be empty',
  NAME_SHORT = 'This field cannot be less than 3 characters',
  NAME_INVALID = 'The field contains invalid characters or numbers',
  DATE_REQUIRED = 'This field cannot be empty',
  DATE_INVALID = 'Necessary specify a date in the future',
  DELIVERY_REQUIRED = 'This field cannot be empty',
  IMAGE_REQUIRED = 'This field cannot be empty',
  AGREE_REQUIRED = 'Necessary to agree to the processing of personal data',
}

import { Places } from "../../utils/types";

export type Props = {name: string, cities: string[]}

export type GetPlacesReturnType = {name: string, slug: string, href: string}[]
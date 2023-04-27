export type Base64<imageType extends string> = `data:image/${imageType};base64${string}`

export interface IResult<format> {
  image: Base64<format>
}
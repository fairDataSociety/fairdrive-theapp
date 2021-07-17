export type SwarmImageRaw = {
  /**  Resource type */
  "@type": "image" | "responsiveImage"
  /**  hash/<path?> of the original image */
  value: string
  /** array containing the width and height of the original image */
  originalSize?: [number, number]
  /** Blurred & Low resolution base64 of the original image  */
  blurredBase64?: string
  /**  Responsive images references (only for @type = 'responsiveImage') */
  sources?: {
    [size: string]: string
  }
}

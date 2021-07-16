import { SwarmImageRaw } from "./types"

/**
 * Load an image object and handles responsive images
 */
export default class SwarmImageReader {
  isResponsive: boolean
  responsiveSizes: number[]

  imageRaw?: SwarmImageRaw
  blurredBase64?: string
  originalSource: string
  originalReference?: string
  originalImageSize?: [number, number]
  responsiveSources?: { [size: string]: string }
  filePreview?: string

  constructor(image: SwarmImageRaw | undefined) {
    this.originalSource = ""

    if (image) {
      this.imageRaw = image
      this.isResponsive = image["@type"] === "responsiveImage"
      this.blurredBase64 = image.blurredBase64
      this.originalReference = image.value
      this.originalSource = this.getFileUrl(image.value)
      this.originalImageSize = image.originalSize

      const responsiveUrls =
        this.isResponsive && image.sources
          ? Object.keys(image.sources).reduce(
            (obj, size) => ({
              ...obj,
              [size]: this.getFileUrl(image.sources![size]),
            }),
            {}
          )
          : undefined
      this.responsiveSources = responsiveUrls
    }
  }

  // Props
  get responsivePaths(): string[] {
    return Object.keys(this.responsiveSources ?? [])
  }

  get srcset(): string | undefined {
    if (!this.responsiveSources) return undefined

    const responsiveSources = this.responsiveSources
    const resposiveSizes = Object.keys(responsiveSources)

    return resposiveSizes.reduce(
      (srcset, size) => `${srcset ? srcset + "," : ""} ${size} ${responsiveSources[size]}`, ""
    )
  }

  // Methods

  getOptimizedSrc(size?: number): string {
    if (!this.responsiveSources || !size) return this.originalSource

    const screenSize = size * (window.devicePixelRatio ?? 1)
    const sizes = Object.keys(this.responsiveSources).map(size => +size.replace(/w$/, "")).sort()
    const largest = sizes[sizes.length - 1]

    if (size > largest) return this.responsiveSources[largest + "w"]

    const optimized = sizes.find(size => size > screenSize)
    const optimizedSrc = optimized ? this.responsiveSources[optimized + "w"] : this.responsiveSources[largest + "w"]

    return optimizedSrc
  }


  // Utils
  getFileUrl(reference: string) {
    return `${process.env.REACT_APP_BEE_HOST}/files/${reference}`
  }
}

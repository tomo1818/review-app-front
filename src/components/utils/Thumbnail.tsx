import { Image } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useMemo } from 'react'

type ImageProps = {
  width: number
  scale?: number
  layout: 'square' | 'vertical' | 'horizontal' | 'circle'
  source?: 'src' | 'static'
}

type SrcImageProps = ImageProps & {
  src: string
}

type AltImageProps = ImageProps & {
  src: string
  alt: string
}

type Props = SrcImageProps | AltImageProps

export const Thumbnail: React.FC<Props> = (props) => {
  const choiceStyle = useMemo(() => {
    switch (props.layout) {
      case 'square':
        return square(props.width)
      case 'vertical':
        return vertical(props.width, props.scale)
      case 'horizontal':
        return horizontal(props.width)
      case 'circle':
        return circle(props.width)
    }
  }, [props.layout, props.scale, props.width])

  switch (props.source) {
    case 'src':
      {
        const { layout, src } = props as SrcImageProps
        return (
          <div css={choiceStyle}>
            <Image
              src={src}
              alt=""
              // layout="fill"
              objectFit={layout === 'circle' ? 'cover' : 'contain'}
            />
          </div>
        )
      }
      break

    default:
      {
        const { layout, src, alt } = props as AltImageProps
        return (
          <div css={[choiceStyle, defaultImageStyle(props.width)]}>
            <Image
              src={src}
              alt={alt ?? ''}
              // layout="fill"
              objectFit={layout === 'circle' ? 'cover' : 'contain'}
            />
          </div>
        )
      }
      break
  }
}

const defaultImageStyle = (size: number) => css`
  margin: 0 auto;

  img {
    max-height: ${size}px;
    margin: 0 auto;
  }
`

const square = (size: number) => css`
  position: relative;
  display: flex;
  min-width: ${size}px;
  max-width: ${size}px;
  min-height: ${size}px;
  max-height: ${size}px;
  align-items: center;
  background: '#f8f8f8';
`

const vertical = (size: number, scale = 1.33) => css`
  position: relative;
  min-width: ${size}px;
  max-width: ${size}px;
  min-height: calc(${size}px * ${scale});
  max-height: calc(${size}px * ${scale});
  background: '#f8f8f8';
`

const horizontal = (width: number) => css`
  position: relative;
  min-width: ${width}px;
  max-width: ${width}px;
  min-height: calc(${width}px * 0.66);
  max-height: calc(${width}px * 0.66);
  background: '#f8f8f8';
`

const circle = (size: number) => css`
  position: relative;
  min-width: ${size}px;
  max-width: ${size}px;
  min-height: ${size}px;
  max-height: ${size}px;

  > div {
    border-radius: 50%;
  }
`

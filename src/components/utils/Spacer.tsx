type Props = {
  size: number
  axis?: 'vertical' | 'horizontal'
}

export const Spacer = ({ size, axis, ...delegated }: Props) => {
  const width = axis === 'vertical' ? 1 : size
  const height = axis === 'horizontal' ? 1 : size
  return (
    <div
      style={{
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
      {...delegated}
    />
  )
}

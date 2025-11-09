export const isSquare = (x: number): number | undefined => {
  if (x < 0 || !Number.isInteger(x)) return
  const root = Math.sqrt(x)
  if (!Number.isInteger(root)) return
  return root
}

export const wavelengthToRGB = (
  wavelength: number
): [number, number, number] => {
  const gamma = 0.8
  const intensityMax = 1.0
  let R = 0,
    G = 0,
    B = 0

  if (wavelength >= 380 && wavelength < 440) {
    R = -(wavelength - 440) / (440 - 380)
    G = 0.0
    B = 1.0
  } else if (wavelength < 490) {
    R = 0.0
    G = (wavelength - 440) / (490 - 440)
    B = 1.0
  } else if (wavelength < 510) {
    R = 0.0
    G = 1.0
    B = -(wavelength - 510) / (510 - 490)
  } else if (wavelength < 580) {
    R = (wavelength - 510) / (580 - 510)
    G = 1.0
    B = 0.0
  } else if (wavelength < 645) {
    R = 1.0
    G = -(wavelength - 645) / (645 - 580)
    B = 0.0
  } else if (wavelength <= 780) {
    R = 1.0
    G = 0.0
    B = 0.0
  }

  let factor = 0.0
  if (wavelength < 420) {
    factor = 0.3 + (0.7 * (wavelength - 380)) / (420 - 380)
  } else if (wavelength <= 700) {
    factor = 1.0
  } else if (wavelength <= 780) {
    factor = 0.3 + (0.7 * (780 - wavelength)) / (780 - 700)
  }

  const adjust = (color: number) => {
    return color === 0
      ? 0
      : Math.round(intensityMax * Math.pow(color * factor, gamma) * 255)
  }

  return [adjust(R), adjust(G), adjust(B)]
}

export const valueToRGB = (
  value: number,
  base: number
): [number, number, number] => {
  const wavelength = 380 + (value / base) * (780 - 380)
  return wavelengthToRGB(wavelength)
}

export const rgbToCss = ([r, g, b]: [number, number, number]): string => {
  return `rgb(${r}, ${g}, ${b})`
}

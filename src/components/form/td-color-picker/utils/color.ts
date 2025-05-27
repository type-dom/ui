// import { hasOwn, isString } from '@element-plus/utils'

import { hasOwn, isString } from '@type-dom/utils';
import { signal, Signal } from '@type-dom/signals';

const hsv2hsl = function (hue: number, sat: number, val: number) {
  return [
    hue,
    (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0,
    hue / 2,
  ]
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
const isOnePointZero = function (n: unknown) {
  return isString(n) && n.includes('.') && Number.parseFloat(n) === 1
}

const isPercentage = function (n: unknown) {
  return isString(n) && n.includes('%')
}

// Take input from [0, n] and return it as [0, 1]
const bound01 = function (value: number | string, max: number | string) {
  if (isOnePointZero(value)) value = '100%'

  const processPercent = isPercentage(value)
  value = Math.min(max as number, Math.max(0, Number.parseFloat(`${value}`)))

  // Automatically convert percentage into number
  if (processPercent) {
    value = Number.parseInt(`${value * (max as number)}`, 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(value - (max as number)) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (value % (max as number)) / Number.parseFloat(max as string)
}

const INT_HEX_MAP: Record<string, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
}

const hexOne = (value: number) => {
  value = Math.min(Math.round(value), 255)
  const high = Math.floor(value / 16)
  const low = value % 16
  return `${INT_HEX_MAP[high] || high}${INT_HEX_MAP[low] || low}`
}

const toHex = function ({ r, g, b }: { r: number; g: number; b: number }) {
  if (Number.isNaN(+r) || Number.isNaN(+g) || Number.isNaN(+b)) return ''
  return `#${hexOne(r)}${hexOne(g)}${hexOne(b)}`
}

const HEX_INT_MAP: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
}

const parseHexChannel = function (hex: string) {
  if (hex.length === 2) {
    return (
      (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 +
      (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    )
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]
}

const hsl2hsv = function (hue: number, sat: number, light: number) {
  sat = sat / 100
  light = light / 100
  let smin = sat
  const lmin = Math.max(light, 0.01)
  // let sv
  // let v

  light *= 2
  sat *= light <= 1 ? light : 2 - light
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (light + sat) / 2
  const sv =
    light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat)

  return {
    h: hue,
    s: sv * 100,
    v: v * 100,
  }
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
const rgb2hsv = (r: number, g: number, b: number) => {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number
  const v = max

  const d = max - min
  const s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      }
      case g: {
        h = (b - r) / d + 2
        break
      }
      case b: {
        h = (r - g) / d + 4
        break
      }
    }
    h! /= 6
  }

  return { h: h! * 360, s: s * 100, v: v * 100 }
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsv2rgb = function (h: number, s: number, v: number) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

interface ColorOptions {
  enableAlpha: boolean
  format: string
  value?: string
}

export default class Color {
  private _hue = signal(0)
  private _saturation = signal(100)
  private _value = signal(100)
  _alpha = signal(100)
  public enableAlpha = signal(false)
  public format = signal('hex')
  public value = signal('');
  public selected = signal(false)

  constructor(options: Partial<ColorOptions> = {}) {
    for (const option in options) {
      if (hasOwn(options, option)) {
        if ((this as any)[option] instanceof Signal) {
          (this as any)[option].set((options as any)[option])
        } else {
          console.error('(this as any)[' + option + '] is not Signal . ');
        }
      }
    }
    if (options.value) {
      this.fromString(options.value)
    } else {
      this.doOnChange()
    }
  }

  set(prop: { [key: string]: any } | any, value?: number) {
    if (arguments.length === 1 && typeof prop === 'object') {
      for (const p in prop) {
        if (hasOwn(prop, p)) {
          this.set(p, prop[p])
        }
      }
      return
    }
    if ((this as any)[`_${prop}`] instanceof Signal) {
      (this as any)[`_${prop}`].set(value)
    } else {
      console.error('(this as any)[`_${' + prop+ '}`] is not Signal . ')
    }
    this.doOnChange()
  }

  get(prop: string) {
    if (prop === 'alpha') {
      return Math.floor(this._alpha.get()) as number;
    }
    return (this as any)[`_${prop}`].get() as number | string | boolean;
  }

  toRgb() {
    return hsv2rgb(this._hue.get(), this._saturation.get(), this._value.get())
  }

  fromString(value: string) {
    // console.warn('fromString value is ', value)
    if (!value) {
      this._hue.set(0)
      this._saturation.set(100)
      this._value.set(100)

      this.doOnChange()
      return
    }

    const fromHSV = (h: number, s: number, v: number) => {
      this._hue.set(Math.max(0, Math.min(360, h)))
      this._saturation.set(Math.max(0, Math.min(100, s)))
      this._value.set(Math.max(0, Math.min(100, v)))

      this.doOnChange()
    }

    if (value.includes('hsl')) {
      const parts = value
        .replace(/hsla|hsl|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter((val) => val !== '')
        .map((val, index) =>
          index > 2 ? Number.parseFloat(val) : Number.parseInt(val, 10)
        )

      if (parts.length === 4) {
        this._alpha.set(Number.parseFloat(parts[3] as unknown as string) * 100)
      } else if (parts.length === 3) {
        this._alpha.set(100)
      }
      if (parts.length >= 3) {
        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2])
        fromHSV(h, s, v)
      }
    } else if (value.includes('hsv')) {
      const parts = value
        .replace(/hsva|hsv|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter((val) => val !== '')
        .map((val, index) =>
          index > 2 ? Number.parseFloat(val) : Number.parseInt(val, 10)
        )

      if (parts.length === 4) {
        this._alpha.set(Number.parseFloat(parts[3] as unknown as string) * 100)
      } else if (parts.length === 3) {
        this._alpha.set(100)
      }
      if (parts.length >= 3) {
        fromHSV(parts[0], parts[1], parts[2])
      }
    } else if (value.includes('rgb')) {
      const parts = value
        .replace(/rgba|rgb|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter((val) => val !== '')
        .map((val, index) =>
          index > 2 ? Number.parseFloat(val) : Number.parseInt(val, 10)
        )

      if (parts.length === 4) {
        this._alpha.set(Number.parseFloat(parts[3] as unknown as string) * 100)
      } else if (parts.length === 3) {
        this._alpha.set(100)
      }
      if (parts.length >= 3) {
        const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2])
        fromHSV(h, s, v)
      }
    } else if (value.includes('#')) {
      const hex = value.replace('#', '').trim()
      if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(hex))
        return
      let r: number, g: number, b: number

      if (hex.length === 3) {
        r = parseHexChannel(hex[0] + hex[0])
        g = parseHexChannel(hex[1] + hex[1])
        b = parseHexChannel(hex[2] + hex[2])
      } else if (hex.length === 6 || hex.length === 8) {
        r = parseHexChannel(hex.slice(0, 2))
        g = parseHexChannel(hex.slice(2, 4))
        b = parseHexChannel(hex.slice(4, 6))
      }

      if (hex.length === 8) {
        this._alpha.set((parseHexChannel(hex.slice(6)) / 255) * 100)
      } else if (hex.length === 3 || hex.length === 6) {
        this._alpha.set(100)
      }

      const { h, s, v } = rgb2hsv(r!, g!, b!)
      fromHSV(h, s, v)
    }
  }

  compare(color: this) {
    return (
      Math.abs(color._hue.get() - this._hue.get()) < 2 &&
      Math.abs(color._saturation.get() - this._saturation.get()) < 1 &&
      Math.abs(color._value.get() - this._value.get()) < 1 &&
      Math.abs(color._alpha.get() - this._alpha.get()) < 1
    )
  }

  doOnChange() {
    const { _hue, _saturation, _value, _alpha, format } = this

    if (this.enableAlpha.get()) {
      switch (format.get()) {
        case 'hsl': {
          const hsl = hsv2hsl(_hue.get(), _saturation.get() / 100, _value.get() / 100)
          this.value.set(`hsla(${_hue}, ${Math.round(
            hsl[1] * 100
          )}%, ${Math.round(hsl[2] * 100)}%, ${this.get('alpha') as number / 100})`)
          break
        }
        case 'hsv': {
          this.value.set(`hsva(${_hue}, ${Math.round(_saturation.get())}%, ${Math.round(
            _value.get()
          )}%, ${this.get('alpha') as number / 100})`)
          break
        }
        case 'hex': {
          this.value.set(`${toHex(hsv2rgb(_hue.get(), _saturation.get(), _value.get()))}${hexOne(
            (_alpha.get() * 255) / 100
          )}`)
          break
        }
        default: {
          const { r, g, b } = hsv2rgb(_hue.get(), _saturation.get(), _value.get())
          this.value.set(`rgba(${r}, ${g}, ${b}, ${this.get('alpha') as number / 100})`)
        }
      }
    } else {
      switch (format.get()) {
        case 'hsl': {
          const hsl = hsv2hsl(_hue.get(), _saturation.get() / 100, _value.get() / 100)
          this.value.set(`hsl(${_hue.get()}, ${Math.round(hsl[1] * 100)}%, ${Math.round(
            hsl[2] * 100
          )}%)`)
          break
        }
        case 'hsv': {
          this.value.set(`hsv(${_hue.get()}, ${Math.round(_saturation.get())}%, ${Math.round(
            _value.get()
          )}%)`)
          break
        }
        case 'rgb': {
          const { r, g, b } = hsv2rgb(_hue.get(), _saturation.get(), _value.get())
          this.value.set(`rgb(${r}, ${g}, ${b})`)
          break
        }
        default: {
          this.value.set(toHex(hsv2rgb(_hue.get(), _saturation.get(), _value.get())))
        }
      }
    }
  }
}

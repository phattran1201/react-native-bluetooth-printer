# React Native Bluetooth Printer
> React Native plugin for Bluetooth ESC/POS & TSC printers with full TypeScript support.

**Maintained and enhanced by [Harold - @phattran1201](https://github.com/phattran1201) 👨‍💻**

---

<div align="center">

[![npm][npm]][npm-URL] [![React-Native][React-Native]][React-Native-URL] [![Android][Android]][Android-URL][![iOS][iOS]][iOS-URL]

</div>


---

## 📦 Installation

```bash
yarn install @phattran1201/react-native-bluetooth-printer
```
---

## 🚀 Usage

```ts
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from '@phattran1201/react-native-bluetooth-printer';
```

---

## 🔧 BluetoothManager

Bluetooth service management: scan, connect, and pair devices.

### Methods

| Method | Description |
|--------|-------------|
| `isBluetoothEnabled()` | Check if Bluetooth is enabled |
| `enableBluetooth()` | Enable Bluetooth *(Android only)* |
| `disableBluetooth()` | Disable Bluetooth *(Android only)* |
| `scanDevices()` | Scan for nearby devices |
| `connect(address)` | Connect to device |
| `disconnect(address)` | Disconnect from device |
| `unpair(address)` | Unpair device |

### Example

```ts
// Check Bluetooth status
const enabled = await BluetoothManager.isBluetoothEnabled();

// Scan devices
const result = JSON.parse(await BluetoothManager.scanDevices());
console.log(result.paired, result.found);

// Connect
await BluetoothManager.connect(device.address);
```

### Events

| Event | Description |
|-------|-------------|
| `EVENT_DEVICE_ALREADY_PAIRED` | Paired devices list |
| `EVENT_DEVICE_DISCOVER_DONE` | Scan completed |
| `EVENT_DEVICE_FOUND` | New device found |
| `EVENT_CONNECTION_LOST` | Connection lost |
| `EVENT_UNABLE_CONNECT` | Connection failed |
| `EVENT_CONNECTED` | Device connected |

---

## 🧾 BluetoothEscposPrinter

Receipt printer using ESC/POS commands.

### Methods

| Method | Description |
|--------|-------------|
| `printerInit()` | Initialize printer |
| `printText(text, options)` | Print text |
| `printColumn(widths, aligns, texts, options)` | Print table columns |
| `printPic(base64, options)` | Print image |
| `printQRCode(content, size, level)` | Print QR code |
| `printBarCode(content, type, width, height, hriFont, hriPos)` | Print barcode |
| `printerAlign(align)` | Set alignment (0=left, 1=center, 2=right) |
| `cutPaper()` | Cut paper |
| `openDrawer(mode, time1, time2)` | Open cash drawer |

### Print Text Options

```ts
interface EscposPrintTextOptions {
  encoding?: string;    // Default: 'GBK'
  codepage?: number;    // Default: 0
  widthtimes?: number;  // Font width multiplier (0-7)
  heigthtimes?: number; // Font height multiplier (0-7)
  fonttype?: number;    // Font type
}
```

### Print Image Options

```ts
interface EscposPrintPicOptions {
  width?: number;      // Image width in dots
  left?: number;       // Left padding
  center?: boolean;    // Center image
  autoCut?: boolean;   // Auto cut after print
  paperSize?: number;  // 58 or 80 (mm)
}
```

### Example: Print Receipt

```ts
await BluetoothEscposPrinter.printerInit();
await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
await BluetoothEscposPrinter.printText("My Store\n", { widthtimes: 2, heigthtimes: 2 });
await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
await BluetoothEscposPrinter.printText("--------------------------------\n", {});
await BluetoothEscposPrinter.printColumn(
  [16, 8, 8],
  [0, 1, 2],
  ["Item", "Qty", "Price"],
  {}
);
await BluetoothEscposPrinter.printText("--------------------------------\n", {});
await BluetoothEscposPrinter.printText("Total: $100.00\n\n", {});
await BluetoothEscposPrinter.cutPaper();
```

---

## 🖨️ BluetoothTscPrinter

Label printer using TSC commands.

### printLabel(options)

```ts
interface TscLabelOptions {
  width: number;              // Label width (mm)
  height: number;             // Label height (mm)
  gap: number;                // Gap between labels (mm)
  direction?: number;         // 0=forward, 1=backward
  reference?: [number, number]; // Reference point [x, y]
  tear?: string;              // 'ON' or 'OFF'
  sound?: number;             // 0=off, 1=on
  text?: TscTextOptions[];
  qrcode?: TscQRCodeOptions[];
  barcode?: TscBarcodeOptions[];
  image?: TscImageOptions[];
}
```

### Example: Print Label

```ts
await BluetoothTscPrinter.printLabel({
  width: 40,
  height: 30,
  gap: 2,
  direction: BluetoothTscPrinter.DIRECTION.FORWARD,
  tear: BluetoothTscPrinter.TEAR.ON,
  text: [{
    text: "Product Name",
    x: 10,
    y: 10,
    fonttype: BluetoothTscPrinter.FONTTYPE.FONT_1,
    rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
    xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    yscal: BluetoothTscPrinter.FONTMUL.MUL_1
  }],
  barcode: [{
    x: 10,
    y: 50,
    type: BluetoothTscPrinter.BARCODETYPE.CODE128,
    height: 40,
    readable: 1,
    code: "1234567890"
  }]
});
```

### Constants

| Constant | Values |
|----------|--------|
| `DIRECTION` | `FORWARD`, `BACKWARD` |
| `TEAR` | `ON`, `OFF` |
| `ROTATION` | `ROTATION_0`, `ROTATION_90`, `ROTATION_180`, `ROTATION_270` |
| `FONTTYPE` | `FONT_1`-`FONT_8`, `SIMPLIFIED_CHINESE`, `TRADITIONAL_CHINESE`, `KOREAN` |
| `FONTMUL` | `MUL_1`-`MUL_10` |
| `BARCODETYPE` | `CODE128`, `CODE39`, `EAN13`, `EAN8`, etc. |
| `BITMAP_MODE` | `OVERWRITE`, `OR`, `XOR` |
| `EEC` | `LEVEL_L`, `LEVEL_M`, `LEVEL_Q`, `LEVEL_H` |


## 👥 Contributors

<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/phattran1201">
                    <img src="https://avatars.githubusercontent.com/u/36856455" width="100;" alt="phattran1201"/>
                    <br />
                    <sub><b>Harold Tran</b></sub>
                </a>
            </td>
        </tr>
    </tbody>
</table>


<!-- Badge for README -->
[npm]: https://img.shields.io/npm/v/%40phattran1201%2Freact-native-bluetooth-printer?&style=for-the-badge&logo=npm&logoColor=red
[npm-URL]: https://www.npmjs.com/package/@phattran1201/react-native-bluetooth-printer
[Android]: https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white
[Android-URL]: https://www.android.com/
[iOS]: https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white
[iOS-URL]: https://www.apple.com/ios
[React-Native]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-URL]: https://reactnative.dev/

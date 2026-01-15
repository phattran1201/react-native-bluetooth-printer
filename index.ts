import { NativeModules } from 'react-native';

const { BluetoothManager, RNBluetoothPrinter, BluetoothTscPrinter } = NativeModules;

export interface PrintOptions {
  width?: number;
  left?: number;
  autoCut?: boolean;
  center?: boolean;
  paperSize?: number;
}

export interface BluetoothDevice {
  name: string;
  address: string;
  connected?: boolean;
}

// ============ TSC Label Printer Options ============

/** Text element for TSC label printing */
export interface TscTextOptions {
  /** The text string to print */
  text: string;
  /** X position (dots) */
  x: number;
  /** Y position (dots) */
  y: number;
  /** Font type: '1'-'8', 'TSS24.BF2' (Simplified Chinese), 'TST24.BF2' (Traditional Chinese), 'K' (Korean) */
  fonttype: string;
  /** Rotation: 0, 90, 180, 270 */
  rotation: number;
  /** X scale multiplier (1-10) */
  xscal: number;
  /** Y scale multiplier (1-10) */
  yscal: number;
}

/** QR code element for TSC label printing */
export interface TscQRCodeOptions {
  /** QR code content string */
  code: string;
  /** X position (dots) */
  x: number;
  /** Y position (dots) */
  y: number;
  /** Error correction level: 'L', 'M', 'Q', 'H' */
  level: string;
  /** QR code width (square) */
  width: number;
  /** Rotation: 0, 90, 180, 270 */
  rotation?: number;
}

/** Barcode element for TSC label printing */
export interface TscBarcodeOptions {
  /** Barcode content string */
  code: string;
  /** X position (dots) */
  x: number;
  /** Y position (dots) */
  y: number;
  /** Barcode type: '128', '128M', 'EAN128', '25', '25C', '39', '39C', '39S', '93', 'EAN13', etc. */
  type: string;
  /** Barcode height (dots) */
  height: number;
  /** Human readable: 0 = not readable, 1 = readable */
  readable: number;
  /** Rotation: 0, 90, 180, 270 */
  rotation?: number;
  /** Wide bar width (dots) */
  wide?: number;
  /** Narrow bar width (dots) */
  narrow?: number;
}

/** Image element for TSC label printing */
export interface TscImageOptions {
  /** Base64 encoded image data (without schema) */
  image: string;
  /** X position (dots) */
  x: number;
  /** Y position (dots) */
  y: number;
  /** Bitmap mode: 0 = OVERWRITE, 1 = OR, 2 = XOR */
  mode: number;
  /** Image width (height calculated by ratio) */
  width: number;
}

/** Options for BluetoothTscPrinter.printLabel() */
export interface TscLabelOptions {
  /** Label width in mm */
  width: number;
  /** Label height in mm */
  height: number;
  /** Gap between labels in mm */
  gap: number;
  /** Print direction: 0 = FORWARD, 1 = BACKWARD */
  direction?: number;
  /** Reference point [x, y], default [0, 0] */
  reference?: [number, number];
  /** Paper tear: 'ON' or 'OFF' */
  tear?: string;
  /** Beep sound: 0 = off, 1 = on */
  sound?: number;
  /** Collection of text elements */
  text?: TscTextOptions[];
  /** Collection of QR code elements */
  qrcode?: TscQRCodeOptions[];
  /** Collection of barcode elements */
  barcode?: TscBarcodeOptions[];
  /** Collection of image elements */
  image?: TscImageOptions[];
}

export interface BluetoothManagerType {
  /** Check whether Bluetooth is enabled */
  isBluetoothEnabled(): Promise<boolean>;

  /** Enable Bluetooth service and return paired devices (Android only) */
  enableBluetooth(): Promise<string[] | void>;

  /** Disable Bluetooth service (Android only) */
  disableBluetooth(): Promise<void>;

  /** Scan for nearby Bluetooth devices. Returns JSON string with paired/found devices */
  scanDevices(): Promise<string>;

  /** Stop scanning for devices (iOS only) */
  stopScan(): Promise<void>;

  /** Connect to a Bluetooth device by address */
  connect(address: string): Promise<void>;

  /** Disconnect from a Bluetooth device by address (Android only) */
  disconnect(address: string): Promise<string>;

  /** Get the address of currently connected device (Android only) */
  getConnectedDeviceAddress(): Promise<string | null>;

  /** Check if a device is currently connected (Android only) */
  isDeviceConnected(): Promise<boolean>;

  /** Unpair a device by address */
  unpair(address: string): Promise<void>;

  // Event constants
  EVENT_DEVICE_ALREADY_PAIRED: string;
  EVENT_DEVICE_DISCOVER_DONE: string;
  EVENT_DEVICE_FOUND: string;
  EVENT_CONNECTION_LOST: string;
  EVENT_UNABLE_CONNECT: string;
  EVENT_CONNECTED: string;
  EVENT_BLUETOOTH_NOT_SUPPORT: string;
  DEVICE_NAME: string;
}

// ============ ESC/POS Receipt Printer Options ============

/** Options for BluetoothEscposPrinter.printText() */
export interface EscposPrintTextOptions {
  /** Text encoding, default 'GBK' */
  encoding?: string;
  /** Codepage to use, default 0 */
  codepage?: number;
  /** Font width multiplier (0-7), default 0 */
  widthtimes?: number;
  /** Font height multiplier (0-7), default 0 */
  heigthtimes?: number;
  /** Font type, default 0 */
  fonttype?: number;
}

/** Options for BluetoothEscposPrinter.printPic() */
export interface EscposPrintPicOptions {
  /** Image width in dots (58mm = 384 dots, 80mm = 576 dots) */
  width?: number;
  /** Left padding in dots */
  left?: number;
  /** Center the image horizontally */
  center?: boolean;
  /** Auto cut after printing, default true */
  autoCut?: boolean;
  /** Paper size: 58 or 80 (mm) */
  paperSize?: number;
}

/** The printer for receipt printing, following ESC/POS command */
export interface BluetoothEscposPrinterType {
  /** Initialize the printer */
  printerInit(): Promise<void>;

  /** Print buffer data and feed lines */
  printAndFeed(feed: number): Promise<void>;

  /** Set the printer left space/margin */
  printerLeftSpace(sp: number): Promise<void>;

  /** Set the line spacing */
  printerLineSpace(sp: number): Promise<void>;

  /** Set underline: 0=off, 1=on, 2=deeper */
  printerUnderLine(line: number): Promise<void>;

  /** Set text alignment: ALIGN.LEFT (0), ALIGN.CENTER (1), ALIGN.RIGHT (2). Does not work on printPic() */
  printerAlign(align: number): Promise<void>;

  /**
   * Print text with optional formatting
   * @param text - The text to print
   * @param options - Print options (encoding, codepage, widthtimes, heigthtimes, fonttype)
   */
  printText(text: string, options?: EscposPrintTextOptions): Promise<void>;

  /**
   * Print text in columns (table layout)
   * @param columnWidths - Width of each column in characters (Chinese = 2 chars width)
   * @param columnAligns - Alignment for each column (0=left, 1=center, 2=right)
   * @param columnTexts - Text content for each column
   * @param options - Same options as printText()
   */
  printColumn(
    columnWidths: number[],
    columnAligns: number[],
    columnTexts: string[],
    options?: EscposPrintTextOptions,
  ): Promise<void>;

  /** Set the printer width */
  setWidth(width: number): void;

  /**
   * Print a base64 encoded image
   * @param base64 - Base64 encoded image data (without schema)
   * @param options - Print options (width, left, center, autoCut, paperSize)
   */
  printPic(base64: string, options?: EscposPrintPicOptions): Promise<void>;

  /** Print self-test page */
  selfTest(cb?: (result: boolean) => void): void;

  /** Set rotation for the line */
  rotate(rotate: number): Promise<void>;

  /** Set bold weight for the line */
  setBlob(weight: number): Promise<void>;

  /**
   * Print QR code
   * @param content - QR code content
   * @param size - QR code size (1-16)
   * @param correctionLevel - Error correction: L(1), M(0), Q(3), H(2)
   */
  printQRCode(content: string, size: number, correctionLevel: number): Promise<void>;

  /**
   * Print barcode
   * @param content - Barcode content
   * @param symbology - Barcode type (use BARCODETYPE constants)
   * @param width - Bar width (2-6)
   * @param height - Barcode height in dots
   * @param hriFontType - HRI font type (0 or 1)
   * @param hriFontPosition - HRI position: 0=none, 1=above, 2=below, 3=both
   */
  printBarCode(
    content: string,
    symbology: number,
    width: number,
    height: number,
    hriFontType: number,
    hriFontPosition: number,
  ): Promise<void>;

  /** Cut paper */
  cutPaper(): Promise<void>;

  /** Cut at current point */
  cutOnePoint(): void;

  /**
   * Open cash drawer
   * @param nMode - Drawer pin (0 or 1)
   * @param nTime1 - On time (ms)
   * @param nTime2 - Off time (ms)
   */
  openDrawer(nMode: number, nTime1: number, nTime2: number): void;

  // Constants
  ERROR_CORRECTION: { L: number; M: number; Q: number; H: number };
  BARCODETYPE: Record<string, number>;
  ROTATION: { OFF: number; ON: number };
  ALIGN: { LEFT: number; CENTER: number; RIGHT: number };
}

export interface BluetoothTscPrinterType {
  /** Print a label with the specified options */
  printLabel(options: TscLabelOptions): Promise<void>;
  DIRECTION: Record<string, number>;
  DENSITY: Record<string, number>;
  BARCODETYPE: Record<string, string>;
  FONTTYPE: Record<string, string>;
  EEC: Record<string, string>;
  ROTATION: Record<string, number>;
  FONTMUL: Record<string, number>;
  BITMAP_MODE: Record<string, number>;
  PRINT_SPEED: Record<string, number>;
  TEAR: Record<string, string>;
  READABLE: Record<string, number>;
}

// Ensure the objects are initialized even if NativeModule is missing (e.g. storage only) to avoid immediate crashes diff from original behavior but safer
// Though original behavior was just export.

const BluetoothManagerModule = BluetoothManager as BluetoothManagerType;
const BluetoothEscposPrinterModule = RNBluetoothPrinter as BluetoothEscposPrinterType;
const BluetoothTscPrinterModule = BluetoothTscPrinter as BluetoothTscPrinterType;

if (BluetoothTscPrinter) {
  BluetoothTscPrinterModule.DIRECTION = {
    FORWARD: 0,
    BACKWARD: 1,
  };

  BluetoothTscPrinterModule.DENSITY = {
    DNESITY0: 0,
    DNESITY1: 1,
    DNESITY2: 2,
    DNESITY3: 3,
    DNESITY4: 4,
    DNESITY5: 5,
    DNESITY6: 6,
    DNESITY7: 7,
    DNESITY8: 8,
    DNESITY9: 9,
    DNESITY10: 10,
    DNESITY11: 11,
    DNESITY12: 12,
    DNESITY13: 13,
    DNESITY14: 14,
    DNESITY15: 15,
  };
  BluetoothTscPrinterModule.BARCODETYPE = {
    CODE128: '128',
    CODE128M: '128M',
    EAN128: 'EAN128',
    ITF25: '25',
    ITF25C: '25C',
    CODE39: '39',
    CODE39C: '39C',
    CODE39S: '39S',
    CODE93: '93',
    EAN13: 'EAN13',
    EAN13_2: 'EAN13+2',
    EAN13_5: 'EAN13+5',
    EAN8: 'EAN8',
    EAN8_2: 'EAN8+2',
    EAN8_5: 'EAN8+5',
    CODABAR: 'CODA',
    POST: 'POST',
    UPCA: 'EAN13',
    UPCA_2: 'EAN13+2',
    UPCA_5: 'EAN13+5',
    UPCE: 'EAN13',
    UPCE_2: 'EAN13+2',
    UPCE_5: 'EAN13+5',
    CPOST: 'CPOST',
    MSI: 'MSI',
    MSIC: 'MSIC',
    PLESSEY: 'PLESSEY',
    ITF14: 'ITF14',
    EAN14: 'EAN14',
  };
  BluetoothTscPrinterModule.FONTTYPE = {
    FONT_1: '1',
    FONT_2: '2',
    FONT_3: '3',
    FONT_4: '4',
    FONT_5: '5',
    FONT_6: '6',
    FONT_7: '7',
    FONT_8: '8',
    SIMPLIFIED_CHINESE: 'TSS24.BF2',
    TRADITIONAL_CHINESE: 'TST24.BF2',
    KOREAN: 'K',
  };
  BluetoothTscPrinterModule.EEC = {
    LEVEL_L: 'L',
    LEVEL_M: 'M',
    LEVEL_Q: 'Q',
    LEVEL_H: 'H',
  };
  BluetoothTscPrinterModule.ROTATION = {
    ROTATION_0: 0,
    ROTATION_90: 90,
    ROTATION_180: 180,
    ROTATION_270: 270,
  };
  BluetoothTscPrinterModule.FONTMUL = {
    MUL_1: 1,
    MUL_2: 2,
    MUL_3: 3,
    MUL_4: 4,
    MUL_5: 5,
    MUL_6: 6,
    MUL_7: 7,
    MUL_8: 8,
    MUL_9: 9,
    MUL_10: 10,
  };
  BluetoothTscPrinterModule.BITMAP_MODE = {
    OVERWRITE: 0,
    OR: 1,
    XOR: 2,
  };
  BluetoothTscPrinterModule.PRINT_SPEED = {
    SPEED1DIV5: 1,
    SPEED2: 2,
    SPEED3: 3,
    SPEED4: 4,
  };
  BluetoothTscPrinterModule.TEAR = {
    ON: 'ON',
    OFF: 'OFF',
  };
  BluetoothTscPrinterModule.READABLE = {
    DISABLE: 0,
    EANBLE: 1,
  };
}

if (BluetoothEscposPrinterModule) {
  BluetoothEscposPrinterModule.ERROR_CORRECTION = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2,
  };

  BluetoothEscposPrinterModule.BARCODETYPE = {
    UPC_A: 65, //11<=n<=12
    UPC_E: 66, //11<=n<=12
    JAN13: 67, //12<=n<=12
    JAN8: 68, //7<=n<=8
    CODE39: 69, //1<=n<=255
    ITF: 70, //1<=n<=255(even numbers)
    CODABAR: 71, //1<=n<=255
    CODE93: 72, //1<=n<=255
    CODE128: 73, //2<=n<=255
  };
  BluetoothEscposPrinterModule.ROTATION = {
    OFF: 0,
    ON: 1,
  };
  BluetoothEscposPrinterModule.ALIGN = {
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2,
  };
}

export {
  BluetoothEscposPrinterModule as BluetoothEscposPrinter,
  BluetoothManagerModule as BluetoothManager,
  BluetoothTscPrinterModule as BluetoothTscPrinter,
};

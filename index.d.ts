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

export interface BluetoothEscposPrinterType {
  printText(text: string, options?: any): Promise<void>;
  printPic(base64: string, options?: PrintOptions): Promise<void>;
  printQRCode(content: string, size: number, correctionLevel: number): Promise<void>;
  printBarCode(
    content: string,
    symbology: number,
    width: number,
    height: number,
    hriFontType: number,
    hriFontPosition: number,
  ): Promise<void>;
  cutPaper(): Promise<void>;
  printerInit(): Promise<void>;
  printerLeftSpace(sp: number): Promise<void>;
  printerLineSpace(sp: number): Promise<void>;
  printerUnderLine(line: number): Promise<void>;
  printerAlign(align: number): Promise<void>;
  rotate(rotate: number): Promise<void>;
  setBlob(weight: number): Promise<void>;
  selfTest(cb?: (result: boolean) => void): void;
  setWidth(width: number): void;
  printColumn(
    columnWidths: number[],
    columnAligns: number[],
    columnTexts: string[],
    options?: any,
  ): Promise<void>;
  cutOnePoint(): void;
  openDrawer(nMode: number, nTime1: number, nTime2: number): void;

  ERROR_CORRECTION: { L: number; M: number; Q: number; H: number };
  BARCODETYPE: Record<string, number>;
  ROTATION: { OFF: number; ON: number };
  ALIGN: { LEFT: number; CENTER: number; RIGHT: number };
}

export interface BluetoothTscPrinterType {
  printLabel(options: any): Promise<void>;
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

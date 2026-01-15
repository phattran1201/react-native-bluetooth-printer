//
//  PrintImageBleWriteDelegate.h
//  RNBluetoothPrinter
//
#import <React/RCTBridgeModule.h>
#import "RNBluetoothManager.h"
#import "RNBluetoothPrinter.h"
@interface PrintImageBleWriteDelegate :NSObject<WriteDataToBleDelegate>
@property NSData *toPrint;
@property NSInteger width;
@property NSInteger now;
@property RNBluetoothManager *printer;
@property RCTPromiseRejectBlock pendingReject;
@property RCTPromiseResolveBlock pendingResolve;
-(void) print;
@end

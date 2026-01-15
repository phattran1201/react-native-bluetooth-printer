
package rn.bluetooth.printer;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import rn.bluetooth.printer.escpos.RNBluetoothPrinterModule;
import rn.bluetooth.printer.tsc.RNBluetoothTscPrinterModule;

public class RNBluetoothPrinterPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        BluetoothService service = new BluetoothService();
        return Arrays.<NativeModule>asList(new RNBluetoothManagerModule(reactContext, service),
                new RNBluetoothPrinterModule(reactContext, service),
                new RNBluetoothTscPrinterModule(reactContext, service));
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}

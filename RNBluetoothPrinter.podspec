require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNBluetoothPrinter"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = 'Phat Tran'
  s.homepage     = 'https://github.com/phattran1201/react-native-bluetooth-printer'
  s.license      = package["license"]
  s.platform     = :ios, "12.0"
  s.source       = { :git => "https://github.com/phattran1201/react-native-bluetooth-printer.git", :tag => "#{s.version}" }
  s.source_files = "ios/*.{h,m}"
  s.dependency "React-Core"
  s.dependency "ZXingObjC", "~> 3.6"
end

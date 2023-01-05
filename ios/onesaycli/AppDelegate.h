#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
// Add the header at the top of the file:
#import <React/RCTLinkingManager.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

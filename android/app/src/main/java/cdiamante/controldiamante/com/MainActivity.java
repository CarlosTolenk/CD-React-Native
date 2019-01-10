package cdiamante.controldiamante.com;

import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.content.res.Configuration;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;



public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

     @Override
     protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);  // here
       super.onCreate(savedInstanceState);
       // setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
     }

    @Override
    protected String getMainComponentName() {
        return "ControlDiamante";
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      this.sendBroadcast(intent);
  }

//   @Override
//   public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
//      super.onActivityResult(requestCode, resultCode, data);
//      if (requestCode == PAY_PAL_REQUEST_ID) {
//          payPalPackage.handleActivityResult(requestCode, resultCode, data);
//      } else {
//          otherModulesHandlers(requestCode, resultCode, data);
//      }
//   }


}

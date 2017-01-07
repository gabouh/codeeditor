import React from 'react';
import AppBar from 'material-ui/AppBar';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const styles = {
appBar: {
    display:"none"
    
  },
};

const AppBarIcon = () => (
  <AppBar
    title="Codiyapa Code"
    iconStyleLeft={styles.appBar}
  />
);

export default AppBarIcon;
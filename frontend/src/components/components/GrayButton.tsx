import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from "./theme";
import styles from "./button.module.css";

interface LargeButtonProps {
    text: string, //text inside button
    action: any; //onclick handler
}

class GrayButton extends React.Component<LargeButtonProps>{

    public render(): ReactNode {
        return (
            <MuiThemeProvider theme={theme}>
                <Button color="primary" className={styles.button} onClick={this.props.action}>
                    <span>
                        {this.props.text}
                    </span>
                </Button>
            </MuiThemeProvider>
        )
    }

}

export { GrayButton };

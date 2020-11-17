import React, { ReactNode } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from "./theme";
import styles from "./button.module.css";
import TextField from '@material-ui/core/TextField';

interface TextBoxProps {
    value: string,
    action: any,
    placeholder: string
}

class TextBox extends React.Component<TextBoxProps>{

    public render(): ReactNode {
        return (
            <MuiThemeProvider theme={theme}>
                <TextField id="outlined-basic"
                    className={styles.textBox}
                    color="primary"
                    variant="outlined"
                    value={this.props.value}
                    onChange={this.props.action}
                    placeholder={this.props.placeholder} />
            </MuiThemeProvider>
        );
    }

}

export { TextBox };

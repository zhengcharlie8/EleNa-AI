import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: grey[500]
        }
    }
});

export { theme };

import { withStyles } from '@material-ui/core';
import IconButton_ from '@material-ui/core/IconButton';

export const IconButton = withStyles({
    root: {
        border: 'none',
        width: '2vmax',
        height: '2vmax',
        textIndent: '-10000px',
        position: 'absolute',
        outline: 'none',
        cursor: 'pointer',
        opacity: 0.25,
        top: '20px',
        right: '20px',
        backgroundImage: "url('/images/refresh.svg')",
        backgroundSize: '2vmax',
        transition: 'opacity 0.25s, transform 0.25s',

        '&:hover': {
            opacity: 0.5,
        },

        '&:focus': {
            transform: 'scale(1.5)',
        },
    },
})(IconButton_);

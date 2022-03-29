import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme => ({
    formControl: {
        margin: theme.spacing(1), minWidth: 120, marginBottom: '35px'
    },

    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    
    loading: {
        height: '700px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        padding: '30px'
    },

    marginBottom: {
        marginBottom: '40px'
    },

    list: {
        height: '80vh',
        overflow: 'auto'
    }
})));
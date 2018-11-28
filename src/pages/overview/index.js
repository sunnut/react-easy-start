import Loadable from 'react-loadable';
import { view as Loader } from '../../components/loader';

const view = Loadable({
    loader: () => import('./view'),
    loading: Loader
});

export {view};
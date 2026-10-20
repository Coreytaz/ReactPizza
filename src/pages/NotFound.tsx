import { useDocumentTitle } from '../hooks/useDocumentTitle';
import NotFoundBlock from '../components/NotFoundBlock';

const NotFound = () => {
  useDocumentTitle('Страница не найдена');
  return <NotFoundBlock />;
};
export default NotFound;

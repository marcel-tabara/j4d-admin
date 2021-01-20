import { keywordActions, keywordSelectors } from '@j4d-admin/services';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useKeywords = () => {
  const dispatch = useDispatch();
  const keywords = useSelector(keywordSelectors.keywordSelector) || [];

  useEffect(() => {
    dispatch(
      keywordActions.handleKeywords({
        operation: 'read',
        modelType: 'keyword',
        query: {},
      }),
    );
  }, []);

  return {
    keywords,
  };
};

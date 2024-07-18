import { useState, useEffect } from 'react';
import { getUserRoles } from '../services/userRoles';
import { ErrorResponse } from '../interfaces/ErrorResponse';

export const useUserRoles = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        setLoading(true);
        const data = await getUserRoles();
        setUserRoles(data);
      } catch (err) {
        const error = err as ErrorResponse;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, []);

  return { userRoles, loading, error };
};

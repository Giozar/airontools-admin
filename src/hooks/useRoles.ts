// src/features/roles/hooks/useRoles.js
import { useState, useEffect } from 'react';
import { getRoles } from '../services/roles';
import { ErrorResponse } from '../interfaces/ErrorResponse';

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const data = await getRoles();
        setRoles(data);
      } catch (err) {
        const error = err as ErrorResponse;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};

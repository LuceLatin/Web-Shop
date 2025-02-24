import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DetaljiProizvodaca = () => {
  const { id } = useParams();
  const [proizvodac, setProizvodac] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [disableDelete, setDisableDelete] = useState(false);

  useEffect(() => {
    fetchProizvodac();
    povezaniProizvodi();
  }, [id]);

  const fetchProizvodac = async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.isAdmin);
    }

    try {

      const response = await fetch(`/proizvodac/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const proizvodacData = await response.json();
      setProizvodac(proizvodacData);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja proizvodaca:', error.message);
    }
  };

  const povezaniProizvodi = async () => {
    try {
      const response = await fetch(`/proizvodac-proizvod/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.ok) {
        const povezanost = await response.json();
        if (povezanost === null) {
          setDisableDelete(false);
        }
        else{
          setDisableDelete(true);
        }      
      }
       else {
        console.error('Nije moguće izbrisati proizvođača. Status:', response.status);
      }
    } catch (error) {
      console.error('Greška prilikom brisanja proizvođača:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/proizvodac/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.ok) {
        navigate('/proizvodaci');
      
      }else if (response.status === 400) {
        console.log("Postoji proizvod s tim proizvođačem");
      } 
       else {
        console.error('Nije moguće izbrisati proizvođača. Status:', response.status);
      }
    } catch (error) {
      console.error('Greška prilikom brisanja proizvođača:', error.message);
    }
  };

  if (!proizvodac) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-css'>
      <h1>Detalji proizvođača</h1>
      <h3>{proizvodac.naziv}</h3>
      <p>Godina osnivanja: {proizvodac.godinaOsnivanja}</p>
      <p>Država: {proizvodac.drzava}</p>
      <p>Opis firme: {proizvodac.opisFirme}</p>
      <p>Logo url: <a href={proizvodac.logoURL} target="_blank" rel="noopener noreferrer">{proizvodac.logoURL}</a></p>
      
      {isAdmin && (
        <div>
          {!disableDelete && (
        <button className='button-css' onClick={handleDelete}>
        Izbriši proizvođača
      </button>

          )}
        <Link to={`/proizvodac/update/${proizvodac._id}`}>
        <button className="button-css">
          Uredi proizvodača
        </button>
      </Link>
      </div>
      )}
    </div>

  );
};

export default DetaljiProizvodaca;

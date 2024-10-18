import { airontoolsAPI } from '@configs/api.config';
import {
	Company,
	CreateCompany,
	UpdateCompany,
} from '@interfaces/Company.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

// Crear una nueva empresa
export async function createCompanyService(company: CreateCompany) {
	try {
		const response = await axios.post(`${airontoolsAPI}/companies`, company);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener todas las empresas
export async function getAllCompaniesService() {
	try {
		const response = await axios.get(`${airontoolsAPI}/companies`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

export async function searchCompaniesService(
	searchTerm: string,
	limit: number = 10,
	offset: number = 0,
): Promise<Company[]> {
	try {
		const response = await axios.post<Company[]>(
			`${airontoolsAPI}/companies/search?limit=${limit}&offset=${offset}`,
			{
				keywords: searchTerm,
			},
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Obtener una empresa por ID
export async function getCompanyByIdService(id: string) {
	try {
		const response = await axios.get(`${airontoolsAPI}/companies/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Actualizar una empresa por ID
export async function updateCompanyService(
	id: string,
	updateCompanyDto: Partial<UpdateCompany>,
) {
	try {
		const response = await axios.patch(
			`${airontoolsAPI}/companies/${id}`,
			updateCompanyDto,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

// Eliminar una empresa por ID
export async function deleteCompanyService(id: string) {
	try {
		const response = await axios.delete(`${airontoolsAPI}/companies/${id}`);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}

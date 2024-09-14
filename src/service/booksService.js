const Joi = require('joi');
const model = require('../models');
const { Op } = require('sequelize');
const books = model.booksModel;

class booksService {
    constructor() {
        this.books = books;
    }

    async createData(request, h) {
        const { nanoid } = await import('nanoid');
        try {
            const validation = Joi.object({
                name: Joi.string().required().messages({
                    'string.empty': 'Gagal menambahkan buku. Mohon isi nama buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
                }),
                year: Joi.number().required().messages({
                    'number.base': 'Gagal menambahkan buku. Mohon isi tahun terbit buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi tahun terbit buku',
                }),
                author: Joi.string().required().messages({
                    'string.empty': 'Gagal menambahkan buku. Mohon isi nama penulis buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi nama penulis buku',
                }),
                summary: Joi.string().required().messages({
                    'string.empty': 'Gagal menambahkan buku. Mohon isi ringkasan buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi ringkasan buku',
                }),
                publisher: Joi.string().required().messages({
                    'string.empty': 'Gagal menambahkan buku. Mohon isi penerbit buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi penerbit buku',
                }),
                pageCount: Joi.number().required().messages({
                    'number.base': 'Gagal menambahkan buku. Mohon isi jumlah halaman buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi jumlah halaman buku',
                }),
                readPage: Joi.number().required().messages({
                    'number.base': 'Gagal menambahkan buku. Mohon isi jumlah halaman yang sudah dibaca',
                    'any.required': 'Gagal menambahkan buku. Mohon isi jumlah halaman yang sudah dibaca',
                }),
                reading: Joi.boolean().required().messages({
                    'boolean.base': 'Gagal menambahkan buku. Mohon isi status membaca buku',
                    'any.required': 'Gagal menambahkan buku. Mohon isi status membaca buku',
                }),
            });

            const { error } = validation.validate(request.payload);
            if (error) {
                const errors = error.details.map((details) => details.message).join(', ');
                return h.response({
                    status: 'fail',
                    message: errors,
                }).code(400);
            }

            console.log('Request Payload:', request.payload);

            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
            const id = nanoid();
            const insertedAt = new Date().toISOString();
            const updatedAt = insertedAt;
            const finished = pageCount === readPage;

            if (readPage > pageCount) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
                }).code(400);
            }

            const data = {
                id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
            }

            await this.books.create(data);
            return h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            }).code(201);
        } catch (error) {
            return h.response({
                status: 'error',
                message: 'Buku gagal ditambahkan',
                error: error.message,
            }).code(500);
        }
    }



    async getAllData(request, h) {
        try {
            const { name, reading, finished } = request.query;
    
            const where = {};
        
            if (name) {
                where.name = { [Op.like]: '%' + name + '%' };
            }
        
            if (reading) {
                where.reading = reading === 'true';
            }
        
            if (finished) {
                where.finished = finished === 'true';
            }

            console.log('Where clause:', where);
        
            const data = await this.books.findAll({ where, logging: console.log });
            const result = data.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    publisher: item.publisher,
                };
            });
        
            return h.response({
                status: 'success',
                data: {
                    books: result,
                },
            }).code(200);
        } catch (error) {
            console.log(error);
        };

    }
    

    async updateData(request, h) {
        const validation = Joi.object({
            name: Joi.string().required().messages({
                'string.empty': 'Gagal memperbarui buku. Mohon isi nama buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi nama buku',
            }),
            year: Joi.number().required().messages({
                'number.base': 'Gagal memperbarui buku. Mohon isi tahun terbit buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi tahun terbit buku',
            }),
            author: Joi.string().required().messages({
                'string.empty': 'Gagal memperbarui buku. Mohon isi nama penulis buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi nama penulis buku',
            }),
            summary: Joi.string().required().messages({
                'string.empty': 'Gagal memperbarui buku. Mohon isi ringkasan buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi ringkasan buku',
            }),
            publisher: Joi.string().required().messages({
                'string.empty': 'Gagal memperbarui buku. Mohon isi penerbit buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi penerbit buku',
            }),
            pageCount: Joi.number().required().messages({
                'number.base': 'Gagal memperbarui buku. Mohon isi jumlah halaman buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi jumlah halaman buku',
            }),
            readPage: Joi.number().required().messages({
                'number.base': 'Gagal memperbarui buku. Mohon isi jumlah halaman yang sudah dibaca',
                'any.required': 'Gagal memperbarui buku. Mohon isi jumlah halaman yang sudah dibaca',
            }),
            reading: Joi.boolean().required().messages({
                'boolean.base': 'Gagal memperbarui buku. Mohon isi status membaca buku',
                'any.required': 'Gagal memperbarui buku. Mohon isi status membaca buku',
            }),
        });

        const { error } = validation.validate(request.payload);
        if (error) {
            const errors = error.details.map((details) => details.message).join(', ');
            return h.response({
                status: 'fail',
                message: errors,
            }).code(400);
        }

        const id = request.params.id;



        const data = await this.books.findByPk(id);

        if (data === null) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            }).code(404);
        }

        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
        const updatedAt = new Date().toISOString();
        const finished = pageCount === readPage;


        if (readPage > pageCount) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            }).code(400);
        }

        const updateData = {
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt,
        }

        await this.books.update(updateData, {
            where: {
                id,
            },
        });

        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
    }

    async getDataById(request, h) {
        const id = request.params.id;
        const data = await this.books.findByPk(id);

        if (data === null) {
            return h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            }).code(404);
        }

        return h.response({
            status: 'success',
            data: {
                book: data,
            },
        }).code(200);
    }

    async deleteData(request, h) {
        const id = request.params.id;
        const data = await this.books.findByPk(id);

        if (data === null) {
            return h.response({
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan',
            }).code(404);
        }

        await this.books.destroy({
            where: {
                id,
            },
        });

        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }
}


module.exports = booksService;

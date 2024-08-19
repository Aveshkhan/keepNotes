import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SkeletonLoader from "./SkeletonLoader";

import logo from '../assets/Notes app logo.png'

import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { StyleClass } from 'primereact/styleclass';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";


function Dashboard() {

    const [notes, setNotes] = useState([])
    const [filteredNotes, setfilteredNotes] = useState([])
    const [sortedNotes, setSortedNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [sortOrder, setSortOrder] = useState(Boolean);
    const [onNote, setOnNote] = useState({});
    const toggleSearchBar = useRef(null)
    const menuRight = useRef(null);
    const toast = useRef(null);

    const initialValues = {
        title: title,
        content: content
    }

    const menu = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Delete',
                    icon: 'pi pi-times-circle',
                    command: () => {
                        confirmDialog({
                            message: 'Do you want to delete this Note?',
                            header: 'Delete Confirmation',
                            icon: 'pi pi-info-circle',
                            defaultFocus: 'reject',
                            acceptClassName: 'p-button-danger',
                            accept: () => { deleteNote.mutate() },
                            reject: () => { }
                        })
                    }
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () => {
                        setVisibleUpdate(true)
                        setTitle(onNote.title)
                        setContent(onNote.content)
                    }
                }
            ]
        }
    ];

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Minimum 3 character required")
            .required("Title is required"),
        content: Yup.string()
            .min(3, "Minimum 3 character required")
            .required("Content is required"),
    });

    const handleSubmit = () => {
        console.log("handle SUbmit")
        createNotes.mutate({
            'title': title,
            'content': content
        })
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    const handleUpdate = () => {
        updateNote.mutate({
            'title': title,
            'content': content
        })
    }
    
    const formik2 = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: handleUpdate,
    });

    const getNotes = useQuery(['notes'], async () => {
        setNotes([]);
        return await axios.get("https://notes-app-web-service.onrender.com/api/notes").then(Response => {
            setNotes(Response.data)
            setfilteredNotes(Response.data)
            return Response.data
        }).catch(Error =>
            console.log("Error Occured ===>", Error)
        )
    });

    const getNoteData = (event, item) => {
        menuRight.current.toggle(event)
        console.log(item)
        setOnNote(item)
    }

    const createNotes = useMutation({
        mutationFn: async (newNote) => {
            console.log(newNote)
            setVisible(false);
            return await axios.post("https://notes-app-web-service.onrender.com/api/notes", newNote)
        },
        onSuccess: async (res) => {
            setTitle('')
            setContent('')
            await getNotes.refetch()
            console.log(res.data.title)
            await toast.current.show({ severity: 'success', summary: 'New Note Added Succesfully', detail: res.data.title, life: 3000 });

        },
        onError: (error) => {
            console.log("Error ====> ", error)
        },
        onMutate: () => {

        }
    });

    const deleteNote = useMutation({
        mutationFn: async () => {
            return await axios.delete(`https://notes-app-web-service.onrender.com/api/notes/${onNote._id}`)
        },
        onSuccess: async (res) => {
            await getNotes.refetch()
            console.log(res.data.message)
            await toast.current.show({ severity: 'error', summary: 'Deleted Succesfull', detail: res.data.message, life: 3000 });
        },
        onError: (error) => {
            console.log("Error ====> ", error)
        }
    })

    const updateNote = useMutation({
        mutationFn: async (updatedNote) => {
            console.log(updatedNote)
            setVisibleUpdate(false)
            return await axios.put(`https://notes-app-web-service.onrender.com/api/notes/${onNote._id}`, updatedNote)
        },
        onSuccess: async (res) => {
            setTitle('')
            setContent('')
            await getNotes.refetch()
            console.log(res.data)
            await toast.current.show({ severity: 'success', summary: 'Updated Succesfully', detail: res.data.title, life: 3000 });
        },
        onError: (error) => {
            console.log("Error ====> ", error)
        }
    })

    useEffect(() => {
        console.log(notes)
    }, [])

    const sorting = () => {
        setSortOrder(!sortOrder)
        console.log(sortOrder)
        setSorting.mutate()
    }

    const SearchMethod = (e) => {
        console.log(e)
        // if(notes.length > 0){
        const searchResult = notes.filter((item) =>
            item.title.toLowerCase().includes(e.toLowerCase())
        )

        console.log(searchResult)
        setfilteredNotes(searchResult)
        // }
    }


    const setSorting = useMutation({
        mutationFn: async () => {
            if (sortOrder === true) {
                setSortedNotes(filteredNotes.sort((a, b) => a.title.localeCompare(b.title)))
            } else if (sortOrder === false) {
                setSortedNotes(filteredNotes.sort((a, b) => b.title.localeCompare(a.title)))
            } else {
                setSortedNotes([])
            }
        },
        onSuccess: () => {
            if (sortedNotes.length > 0) {
                console.log(sortedNotes)
                setfilteredNotes([...sortedNotes])
            }
        }
    })

    return (
        <div>
            <div className="container mt-3">
                <ConfirmDialog />
                <Button className="addNoteBtn shadow-6" raised label="Add Note" icon="pi pi-plus" size="large" onClick={() => setVisible(true)} />
                <Dialog header="Add New Note" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); setTitle(''); setContent('') }}>
                    <form className="my-5" onSubmit={formik.handleSubmit}>
                        <FloatLabel className="">
                            <InputText id="Title" invalid={formik.touched.title && formik.errors.title} className="w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="Title">Title</label>
                        </FloatLabel>
                        {formik.touched.title && formik.errors.title ? (
                            <small className="text-red-600">{formik.errors.title}</small>
                        ) : null}
                        <FloatLabel className="mt-5">
                            <InputTextarea id="Content" invalid={formik.touched.content && formik.errors.content} className="w-full" value={content} onChange={(e) => setContent(e.target.value)} rows={5} cols={30} />
                            <label htmlFor="Content">Content</label>    
                        </FloatLabel>
                        {formik.touched.content && formik.errors.content ? (
                            <small className="text-red-600">{formik.errors.content}</small>
                        ) : null}
                        <Button type="submit" className="w-full mt-5" label="Save" raised />
                    </form>
                </Dialog>

                {/* update Note Dialog */}
                <Dialog header="Update Note" visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => { if (!visibleUpdate) return; setVisibleUpdate(false); setTitle(''); setContent('') }}>
                    <form className="my-5" onSubmit={formik2.handleSubmit}>
                    <FloatLabel className="">
                            <InputText id="Title" invalid={formik2.touched.title && formik2.errors.title} className="w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="Title">Title</label>
                        </FloatLabel>
                        {formik2.touched.title && formik2.errors.title ? (
                            <small className="text-red-600">{formik2.errors.title}</small>
                        ) : null}
                        <FloatLabel className="mt-5">
                            <InputTextarea id="Content" invalid={formik2.touched.content && formik2.errors.content} className="w-full" value={content} onChange={(e) => setContent(e.target.value)} rows={5} cols={30} />
                            <label htmlFor="Content">Content</label>    
                        </FloatLabel>
                        {formik2.touched.content && formik2.errors.content ? (
                            <small className="text-red-600">{formik2.errors.content}</small>
                        ) : null}
                        <Button type="submit" className="w-full mt-5" label="Save" raised />
                    </form>
                </Dialog>

                <nav className="Nav">
                    <div className="logo">
                        {/* <box-icon type='solid' name='note'></box-icon> */}
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="heroHeader">
                        Keep Notes
                    </div>
                    <div className="searchIcon">
                        <StyleClass nodeRef={toggleSearchBar} selector=".searchInput" toggleClassName="hidden" >
                            <box-icon ref={toggleSearchBar} name='search'></box-icon>
                        </StyleClass>
                    </div>
                </nav>
                <div className="searchInput mb-3">
                    {/* <InputText className="p-inputtext-sm" value={search} onChange={(e) => setSearch(e.target.value)} /> */}

                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText placeholder="Search" onChange={(e) => SearchMethod(e.target.value)} />
                    </IconField>

                    <Button icon="pi pi-sort-alt" size="small" rounded outlined severity="secondary" onClick={sorting} />
                </div>

                <div className="notes">
                    <div className="grid flex-wrap">

                        {getNotes.isFetching && (
                            <SkeletonLoader />
                        )}

                        {getNotes.isError && (
                            <div>{`Error get data!!!`}</div>
                        )}

                        {filteredNotes && filteredNotes.length > 0 && filteredNotes.map((item) => (

                            <div key={item.id} className="col-6 sm:col-6 md:col-3 ">
                                <Card className="h-100 noteCard">
                                    <div className="card-title">
                                        <h2 className="mt-0">{item.title}</h2>
                                        <Toast ref={toast}></Toast>
                                        <box-icon name='dots-vertical-rounded' onClick={(event) => getNoteData(event, item)} aria-controls="popup_menu_right" aria-haspopup ></box-icon>
                                        <Menu model={menu} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                                    </div>
                                    <p className="m-0">
                                        {item.content}
                                    </p>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
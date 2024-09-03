import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircledIcon } from '@radix-ui/react-icons';

export function UserFormModal({ onSubmit }) {
    const[submitResult, setSubmitResult] = useState(null);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: '',
            name: '',
            lastName: '',
            email: '',
            password: '',
            rank: '',
            ffaa: '',
            status: '',
        }
    });

    const onSubmitForm = async (data) => {
        try {
            await onSubmit(data);
            setSubmitResult({ success: true, message: 'Usuario añadido con éxito' });
            reset(); // Resetea el formulario
        } catch (error) {
            setSubmitResult({ success: false, message: 'Error al añadir usuario: ' + error.message });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-2">+ Usuario</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:text-white bg-card">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                </DialogHeader>
                {submitResult && (
                    <Alert variant={submitResult.success ? "success" : "destructive"}>
                        {submitResult.success ? (
                            <CheckCircledIcon className="h-4 w-4" />
                        ) : (
                            <CrossCircledIcon className="h-4 w-4" />
                        )}
                        <AlertTitle>{submitResult.success ? "Éxito" : "Error"}</AlertTitle>
                        <AlertDescription>{submitResult.message}</AlertDescription>
                    </Alert>
                )}
                <form className='' onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Usuario
                            </Label>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Input id="username" className="col-span-3" {...field} />
                                )}
                            />
                            {errors.username && <p className="text-red-500 text-sm col-span-4 text-right">{errors.username.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre
                            </Label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Input id="name" className="col-span-3" {...field} />
                                )}
                            />
                            {errors.name && <p className="text-red-500 text-sm col-span-4 text-right">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastName" className="text-right">
                                Apellido
                            </Label>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Input id="lastName" className="col-span-3" {...field} />
                                )}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm col-span-4 text-right">{errors.lastName.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Este campo es requerido',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                }}
                                render={({ field }) => (
                                    <Input id="email" type="email" className="col-span-3" {...field} />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-sm col-span-4 text-right">{errors.email.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Contraseña
                            </Label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Este campo es requerido', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } }}
                                render={({ field }) => (
                                    <Input id="password" type="password" className="col-span-3" {...field} />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-sm col-span-4 text-right">{errors.password.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rank" className="text-right">
                                Rango
                            </Label>
                            <Controller
                                name="rank"
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccione un rango" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Est">Est</SelectItem>
                                            <SelectItem value="Sargento">Sargento</SelectItem>
                                            <SelectItem value="Sub Oficial">Sub Oficial</SelectItem>
                                            <SelectItem value="Sub Teniente">Sub Teniente</SelectItem>
                                            <SelectItem value="Teniente">Teniente</SelectItem>
                                            <SelectItem value="Capitan">Capitan</SelectItem>
                                            <SelectItem value="Mayor">Mayor</SelectItem>
                                            <SelectItem value="Teniente Coronel">Teniente Coronel</SelectItem>
                                            <SelectItem value="Coronel">Coronel</SelectItem>
                                            <SelectItem value="General">General</SelectItem>

                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.rank && <p className="text-red-500 text-sm col-span-4 text-right">{errors.rank.message}</p>}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ffaa" className="text-right">
                                FFAA
                            </Label>
                            <Controller
                                name="ffaa"
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccione FFAA" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ejercito">Ejercito</SelectItem>
                                            <SelectItem value="Armada">Armada</SelectItem>
                                            <SelectItem value="Fuerza Area">Fuerza Area</SelectItem>
                                            <SelectItem value="Ninguna">Ninguna</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.ffaa && <p className="text-red-500 text-sm col-span-4 text-right">{errors.ffaa.message}</p>}


                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Estado
                            </Label>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccione el estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Activo">Activo</SelectItem>
                                            <SelectItem value="Inactivo">Inactivo</SelectItem>

                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.rank && <p className="text-red-500 text-sm col-span-4 text-right">{errors.rank.message}</p>}
                        </div>
                    </div>
                    <Button className='w-full' type="submit">Guardar Usuario</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
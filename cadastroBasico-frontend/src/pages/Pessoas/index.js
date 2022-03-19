import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import useLoading from '../../hooks/useLoading'
import { axiosGet, axiosDelete } from '../../services/http'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { telefoneMask } from '../../assets/util/constants';
import DialogPessoas from './newPessoa'

export const Pessoas = () => {

    const [pessoas, setPessoas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [pessoa, setPessoa] = useState(null);
    const [selectedPessoas, setSelectedPessoas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toastRef = useRef(null);
    const dialogRef = useRef(null);
    const dt = useRef(null);
    const { showLoading, hideLoading } = useLoading();

    const listPessoas = useCallback(async () => {
        showLoading();
        const response = await axiosGet('/pessoa');
        console.log(response)
        hideLoading();
        
        if (response.status === 200) {
            setPessoas(response.data.pessoas);
        } else {
            toastRef.current.show({
                severity: "error",
                summary: "Erro :(",
                detail: `A sua requisição não pode ser concluída.\n
                        Motivo: ${response.message}`,
                life: 3000,
            });
        }
    }, [showLoading, hideLoading]);
    

    useEffect(() => {
        listPessoas();
    }, [listPessoas]);

    
    const onConfirmDelete = (value) => {
        setPessoa(value);
        setVisible(true);
    }


    const deletePessoa = async () => {
       
        try {       
            const response = await axiosDelete(`/pessoa/deletar/${pessoa.id_pessoa}`); 

            if (response.status === 200) {     
                setSelectedPessoas(null);
                listPessoas();
                toastRef.current.show({ 
                    severity: 'success', 
                    summary: 'Sucesso!', 
                    detail: response.data, // Mensagem de retorno da API               
                    life: 3000 
                }); 
            } else {
                toastRef.current.show({ 
                    severity: 'warn', 
                    summary: 'Atenção!', 
                    detail: response.data, // Mensagem de retorno da API               
                    life: 3000 
                });  
            } 

        } catch (error) {
           if (error) {
               toastRef.current.show({
                   severity: 'error',
                   summary: 'Erro!',
                   detail: 'Ocorreu um erro ao excluir! Tente novamente.',
                   life: 3000
               })
           } 
        }   
    }

    
    const exportCSV = () => {
        dt.current.exportCSV();
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={() => dialogRef.current?.openDialog()} />
                    <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={() => {}} disabled={!selectedPessoas || !selectedPessoas.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Importar" chooseLabel="Importar" className="mr-2 inline-block" />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const nomePessoaTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome_pessoa}
            </>
        );
    }

    const telPessoaTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Telefone</span>
                {telefoneMask(rowData.tel_pessoa)}
            </>
        );
    }

    const cidadePessoa = (rowData) => {
        return (
            <>
                <span className="p-column-title">Cidade</span>
                {rowData.cidade_pessoa}          
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-1" onClick={() => dialogRef.current?.openDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onConfirmDelete(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestão de Pessoas</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <DialogPessoas ref={dialogRef} onSave={() => listPessoas()} />
                    <Toast ref={toastRef} position="bottom-right"/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                    <DataTable 
                        ref={dt} 
                        value={pessoas} 
                        selection={selectedPessoas} 
                        onSelectionChange={(e) => setSelectedPessoas(e.value)}
                        dataKey="id_pessoa"
                        paginator 
                        rows={10} 
                        rowsPerPageOptions={[5, 10, 25]} 
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Pessoas"
                        globalFilter={globalFilter} 
                        emptyMessage="Nenhuma pessoa encontrada." 
                        header={header}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />                   
                        <Column field="nome_pessoa" header="Nome" sortable body={nomePessoaTemplate} />                       
                        <Column field="tel_pessoa" header="Telefone" body={telPessoaTemplate} sortable />   
                        <Column field="cidade_pessoa" header="Cidade" body={cidadePessoa} sortable />
                        <Column header="Ações" style={{width: "130px"}} body={actionBodyTemplate} />
                    </DataTable>                
                    <ConfirmDialog
                            visible={visible}
                            onHide={() => setVisible(false)}
                            message="Tem certeza que deseja excluir esse registro?"
                            header="Atenção!"
                            icon="pi pi-exclamation-triangle"
                            accept={() => deletePessoa()}
                            acceptLabel="Sim"
                            reject={() => setVisible(false)}
                            rejectLabel="Não"
                        />         
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import SideMenu from '../layout/side-menu';
import TopNavigation from '../layout/top-nav';
import Header from './home.header';
import {
  fetchFolders,
  processFolder,
  fetchFoldersForUser,
  fetchFolderDetails,
} from '../../services/folders/folder.service';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FolderItem from './folder.item';
import FileView from './file.view';
import { useUpdate } from '@/helpers/update.context';
import { bouncy } from 'ldrs';
import CommentForm from '../comment/commentform';
import { useAuth } from '@/helpers/auth.context';

const FolderOpen = () => {
  const [selectedView, setSelectedView] = useState(localStorage.getItem('selectedView') || 'files');
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem('isGridView') === 'true' || false
  );
  const [folderStack, setFolderStack] = useState([]);
  const [folderContents, setFolderContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const { updateCount } = useUpdate();
  const { currentUser } = useAuth();
  bouncy.register();

  useEffect(() => {
    fetchFolderContents(currentFolderId);
  }, [currentFolderId, updateCount]);

  const fetchFolderContents = async (folderId) => {
    setIsLoading(true);
    try {
      let folders;
      if (currentUser.role === 'Admin') {
        folders = await fetchFolders(folderId);
      } else if (currentUser.role === 'Faculty') {
        const assignedData = await fetchFoldersForUser(currentUser.email);
        console.log('Faculty folders in FolderOpen:', assignedData.folders);
        folders = assignedData.folders;
      }
      const processedFolders = folders.map((folder) => processFolder(folder));
      console.log('Processed folders:', processedFolders);
      setFolderContents(processedFolders);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching folders:', error);
      setIsLoading(false);
    }
  };

  const updateBreadcrumb = async (folderId) => {
    const folderDetails = await fetchFolderDetails(folderId);
    if (folderDetails) {
      const newBreadcrumb = [];
      let currentFolder = folderDetails;
      while (currentFolder) {
        newBreadcrumb.unshift({ id: currentFolder.id, name: currentFolder.name });
        currentFolder = currentFolder.parent;
      }
      setBreadcrumb(newBreadcrumb);
    }
  };

  const handleFolderDoubleClick = (folderId) => {
    setCurrentFolderId(folderId);
    setFolderStack([...folderStack, folderId]);
    fetchFolderContents(folderId);
    setSelectedView('files');
    updateBreadcrumb(folderId);
  };

  const handleBreadcrumbClick = (index) => {
    setBreadcrumb(breadcrumb.slice(0, index + 1));
    const folderId = breadcrumb[index].id;
    setFolderStack(folderStack.slice(0, index + 1));
    setCurrentFolderId(folderId);
    fetchFolderContents(folderId);
  };

  const navigateToRoot = () => {
    setCurrentFolderId(null);
    setFolderStack([]);
    setBreadcrumb([]);
    fetchFolderContents(null);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    localStorage.setItem('selectedView', view);
  };

  const toggleView = () => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem('isGridView', newGridView.toString());
  };

  const navigateBack = () => {
    if (folderStack.length > 1) {
      const previousFolderId = folderStack.pop();
      setCurrentFolderId(previousFolderId);
      fetchFolderContents(previousFolderId);
    } else {
      setCurrentFolderId(null);
      fetchFolderContents(null);
      setFolderStack([]);
    }
  };

  return (
    <div className='flex h-screen mx-1 bg-[#f8fafd]'>
      <SideMenu />
      <div className='flex flex-col flex-1'>
        {/* <TopNavigation navigateToRoot={navigateToRoot} currentFolderId={currentFolderId} /> */}
        <TopNavigation />
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col flex-1' style={{ scrollbarWidth: 'thin' }}>
            <Header
              selectedButton={selectedView}
              handleButtonClick={handleViewChange}
              isGridView={isGridView}
              toggleView={toggleView}
              navigateBack={navigateBack}
              currentFolderId={currentFolderId}
              setFolders={setFolderContents}
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#' onClick={navigateToRoot}>
                    Root
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumb.length > 0 && <BreadcrumbSeparator />}
                {breadcrumb.map((crumb, index) => (
                  <React.Fragment key={crumb.id}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href='#'
                        onClick={() => handleBreadcrumbClick(index)}
                        className={index === breadcrumb.length - 1 ? 'font-bold' : ''}
                      >
                        {crumb.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <div className='flex h-full overflow-hidden'>
              <div className='flex flex-col w-[70%] bg-white'>
                {isLoading ? (
                  <div className='flex flex-col flex-1 items-center justify-center'>
                    <l-bouncy size={40} color='black'></l-bouncy>
                  </div>
                ) : (
                  <div>
                    {folderContents.length === 0 && selectedView === 'folders' ? (
                      <div className='flex flex-col flex-1 items-center justify-center'>
                        This folder is empty.
                      </div>
                    ) : (
                      <div
                        className={`${
                          isGridView
                            ? 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'
                            : ' '
                        } `}
                      >
                        {folderContents.map((folder) => (
                          <FolderItem
                            key={folder.id}
                            folder={folder}
                            isGridView={isGridView}
                            onDoubleClick={handleFolderDoubleClick}
                            usagePercentage={folder.usagePercentage}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {selectedView === 'files' && (
                  <FileView
                    currentFolderId={currentFolderId}
                    isGridView={isGridView}
                    selectedView={selectedView}
                  />
                )}
              </div>
              <div className='w-[30%]'>
                <CommentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOpen;

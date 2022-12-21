import React from 'react';
import { Progress, ItemCardGrid, CodeSnippet, Link } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { Box, Card, CardContent, Typography, Button, Modal } from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import LooksOneRounded from '@material-ui/icons/LooksOneRounded';
import LooksTwoRounded from '@material-ui/icons/LooksTwoRounded';
import LooksThreeRounded from '@material-ui/icons/Looks3Rounded';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 4,
};

type Connection = {
  agent_id: string;
  command: string[];
  id: string;
  name: string;
  type: string;
};

type ConnectionItemCardProps = {
  connection: Connection;
  openModal: (connection: Connection) => void;
};

export const ConnectionItemCard = ({ connection, openModal }: ConnectionItemCardProps) => {
  return (
    <Card key={connection.id}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='subtitle1'>{connection.name}</Typography>
            <Typography variant='caption'>{connection.type}</Typography>
          </Box>
          <Button
            variant='outlined'
            size='small'
            style={{ textTransform: 'none' }}
            onClick={() => openModal(connection)}
            endIcon={<ArrowForwardOutlinedIcon />}
          >
            Open
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export const ConnectionsList = () => {
  const [open, setOpen] = React.useState(false);
  const [currentConnection, setCurrentConnection] = React.useState<Connection | null>(null);

  const openModal = (conn: Connection) => {
    setCurrentConnection(conn);
    setOpen(true);
  };
  const closeModal = () => {
    setCurrentConnection(null);
    setOpen(false);
  };

  const config = useApi(configApiRef);
  const baseUrl = config.getString('hoop.baseUrl');
  const token = config.getString('hoop.token');

  const { value, loading, error } = useAsync(async (): Promise<Connection[]> => {
    const response = await fetch(`${baseUrl}/connections`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return (
      <Box>
        <Typography variant='body2' gutterBottom paragraph>
          An error was encountered. Please verify your configs or contact us by{' '}
          <Link to='https://hoop.dev'>hoop.dev</Link>
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ItemCardGrid>
        {(value || []).map((connection) => (
          <ConnectionItemCard connection={connection} openModal={openModal} />
        ))}
      </ItemCardGrid>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography variant='h5'>{currentConnection?.name}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant='subtitle2' style={{ marginRight: 4 }}>
              Type:
            </Typography>
            <Typography variant='body2'>{currentConnection?.type}</Typography>
          </Box>

          <Typography variant='h6' gutterBottom paragraph>
            How to access the connection
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <LooksOneRounded style={{ marginRight: 8 }} />
            <Typography variant='subtitle2'>Install hoop in your CLI.</Typography>
          </Box>

          <CodeSnippet
            text={`brew tap hoophq/hoopcli https://github.com/hoophq/hoopcli\nbrew install hoop`}
            language='bash'
            showCopyCodeButton
          />

          <Box sx={{ display: 'flex' }}>
            <LooksTwoRounded style={{ marginRight: 8 }} />
            <Typography variant='subtitle2'>Login to Hoop.</Typography>
          </Box>
          <CodeSnippet text='hoop login your@company.com' language='bash' showCopyCodeButton />

          <Box sx={{ display: 'flex' }}>
            <LooksThreeRounded style={{ marginRight: 8 }} />
            <Typography variant='subtitle2'>Connect your connection.</Typography>
          </Box>
          <CodeSnippet text={`hoop connect ${currentConnection?.name}`} language='bash' showCopyCodeButton />
        </Box>
      </Modal>
    </>
  );
};

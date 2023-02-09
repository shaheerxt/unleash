import { IApiToken } from 'hooks/api/getters/useApiTokens/useApiTokens';
import useToast from 'hooks/useToast';
import copy from 'copy-to-clipboard';
import { FileCopy } from '@mui/icons-material';
import { DELETE_PROJECT_API_TOKEN } from '@server/types';
import { DELETE_API_TOKEN } from '../../../providers/AccessProvider/permissions';
import PermissionIconButton from '../../../common/PermissionIconButton/PermissionIconButton';
import { useContext } from 'react';
import AccessContext from '../../../../contexts/AccessContext';

interface ICopyApiTokenButtonProps {
    token: IApiToken;
    project?: string;
}

export const CopyApiTokenButton = ({
    token,
    project,
}: ICopyApiTokenButtonProps) => {
    const { hasAccess } = useContext(AccessContext);
    const { setToastData } = useToast();

    const copyToken = (value: string) => {
        if (copy(value)) {
            setToastData({
                type: 'success',
                title: `Token copied to clipboard`,
            });
        }
    };

    const permission = Boolean(project)
        ? DELETE_PROJECT_API_TOKEN
        : DELETE_API_TOKEN;

    return (
        <PermissionIconButton
            permission={permission}
            projectId={project}
            tooltipProps={{ title: 'Copy token', arrow: true }}
            onClick={() => copyToken(token.secret)}
            size="large"
            disabled={!hasAccess(permission)}
        >
            <FileCopy />
        </PermissionIconButton>
    );
};

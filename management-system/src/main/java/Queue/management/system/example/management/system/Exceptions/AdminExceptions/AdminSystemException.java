package Queue.management.system.example.management.system.Exceptions.AdminExceptions;

import lombok.Getter;

@Getter
public class AdminSystemException extends Exception {

    public AdminSystemException(AdminErrMsg adminErrMsg) {
        super(adminErrMsg.getMessage());
    }
}

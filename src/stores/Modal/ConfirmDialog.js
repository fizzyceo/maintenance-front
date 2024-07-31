import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useConfirmDialogStore } from "./ConfirmDialogStore";
import { t } from "i18next";
export function ConfirmDialog(props) {
  const { isOpen, toggle, confirm, title, question } = useConfirmDialogStore(
    (state) => state
  );
  return (
    isOpen && (
      <Modal keyboard={false} isOpen={isOpen} toggle={toggle} centered={true}>
        <ModalHeader>{title || t("Confirm Dialog")}</ModalHeader>
        <ModalBody>
          <h3 className="text-center mb-0">{question || t("Are You Sure?")}</h3>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirm}>
            {t("Yes")}
          </Button>
          <Button color="success" onClick={toggle}>
            {t("No")}
          </Button>
        </ModalFooter>
      </Modal>
    )
  );
}

# encoding: UTF-8
class Api::V1::PlaceMessagesController < ApplicationController

  respond_to :json

  def create
    if params.has_key? :place_form
      create_place_message(params[:place_form])
    else
      render json: { error: I18n.t("messages_controller.errors.missing_form_data") }, status: 422
    end
  end


  private

    def create_place_message(form_data)
      begin
        place = Place.find(form_data[:places_id])
      rescue
        render json: { error: I18n.t("messages_controller.errors.invalid_recipient") }, status: 422
        return
      end

      message_data = Hash.new
      message_data["to"] = place.contact_email
      message_data["name"] = form_data[:name]
      message_data["email"] = form_data[:email]
      message_data["message"] = form_data[:message]

      message = PlaceMessage.new(message_data)
      if message.deliver
        render json: { message: I18n.t("messages_controller.success.message_sent", recipient: place.contact_name) }, status: 201
      else
        render json: { error: I18n.t("messages_controller.errors.message_not_sent", recipient: place.contact_name) }, status: 401
      end
    end

end
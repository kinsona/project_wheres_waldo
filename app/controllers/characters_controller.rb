class CharactersController < ApplicationController

  def index
    @characters = Image.find(params[:image_id]).characters

    respond_to do |format|
      format.json { render :json => @characters, :status => 200 }
    end
  end

end
